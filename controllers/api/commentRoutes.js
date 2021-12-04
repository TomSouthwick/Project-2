const router = require( "express" ).Router();
const { Comment, Post, User } = require( "../../models" );
const withAuth = require( "../../utils/auth" );

router.post( "/:id", withAuth, async ( req, res ) => {
    const id = req.params.id
    
    try {        
        
        const newComment = await Comment.create({
            ...req.body,
            post_id: id,
            user_id: req.session.user_id,
        });        
            
        res.status(200).json(newComment);
            
        
    } catch ( err ) {
        res.status( 400 ).json( err );
    }
});
router.get('/:id', async (req, res) => {

    const postID = req.params.id;

    try {
        const postData = await Post.findOne({
            where: 
            {
            id: postID,
            },
            include:
            [
                {
                    model:User
                },
                {
                    model: Comment
                },
            ]
        });
        const commentsFound = await Comment.findAll({
            where: 
                {
                    post_id: postID,
                },
            include:
                [
                    {
                        model:User
                    },
                ]
            });
        
        if (!postData) {
            res.status(404).json({ message: `I can't find a post with id ${id}` });
            return;
        }
        
        let post = postData.get({ plain: true });
        let comments = commentsFound.map(( comments ) => comments.get({ plain: true }));
        

        res.render( "comment", 
        { 
            comments,
            post,
            logged_in: req.session.logged_in,
        });

        } catch (err) {
        res.status(500).json(err);
        }
    });

router.get( "/made/:id", withAuth,async (req, res) => {

    const id = req.params.id


    try {
        const commentsFound = await Comment.findAll({
        where: 
            {
                post_id: id,
            },
        include:
            [
                {
                    model:Post
                },
                {
                    model:User
                },
            ]
        });

        if ( !commentsFound ) {
            res.status(404).json({ message: `I couldn"t find a comment with id ${postID}` });
            return;
        }

        let comments = commentsFound.map(( comments ) => comments.get({ plain: true }));

        res.render( "view-comments", 
        { 
            comments,
            logged_in: req.session.logged_in,

        });

    } catch( err ) {
        res.status( 500 ).json( err );
        }
    });

    module.exports = router;

