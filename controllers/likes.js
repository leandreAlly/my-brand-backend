const Like = require('../models/likes');

class LikeCtrl{
    static likeArticle = (req, res) => {

        const likeExist = Like.find({userId: req.body.userId, articleId: req.body.articleId})
    
        // if(likeExist){
        //     return res.status(501).send('You have already liked this articles');
        // }
    
        const like = new Like({
            articleId: req.body.articleId,
            userId: req.body.userId
        })
    
        like.save().then(
            () => {
                res.status(201).json({
                    message: 'Post liked'
                  });
                
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                  });
            }
        )
    
    }
    
    
   static getAllLikes = (req, res) => {
        Like.find().
        populate('userId', 'name').populate('articleId', 'title').
        exec(function (error, likes){
            if(error){
                res.status(204).json({
                    error: error
                });
            }else{
                res.status(200).json({
                    likes: likes
                });
            }
        });
    }
    

}

export default LikeCtrl;



