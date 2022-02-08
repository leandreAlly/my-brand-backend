const Article = require("../models/article");
const {articleValidation} = require("../validation");

class ArticleCtrl{

    static createArticle = async (req, res, next) => {

        // Article validation before post
        const {error}= articleValidation(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
    
        const article = new Article({
          title: req.body.title,
          content: req.body.content,
          imageUrl: req.body.imageUrl,
          userId: req.body.userId
        });
        article.save().then(
          () => {
            res.status(201).json({
              message: 'Post saved successfully!'
            });
          }
        ).catch(
          (error) => {
            //   console.log(error);
            res.status(400).json({
              error: error
            });
          }
        );
      };
    
    // Get one articles 
    static getOneArticle =(req, res, next) => {
        Article.findOne({
            _id: req.params.id
        }).then(
            (article) => {
    
                 res.status(200).json(article)
            }
        ).catch(
            (error) => {
                res.status(404).json({
                   message: "Article not found!"
                });
            }
        );
    };
    
    // Updating existing articles
    
   static modifyArticle = (req, res, next) => {
    
      // Article validation bofore modifying
      const {error}= articleValidation(req.body);
      if(error){
          return res.status(400).send(error.details[0].message);
      }
        
        const article = new Article({
            _id: req.params.id,
            title: req.body.title,
            content: req.body.content,
            imageUrl: req.body.imageUrl,
            userId: req.body.userId
        });
        Article.updateOne({_id: req.params.id}, article).then(
            () => {
                res.status(201).json({
                    message: 'Article updated successfully'
                });
            }
        ).catch(
            (error) => {
                res.status(401).json({
                    error: error
                });
            }
        );
    };
    
    // Delete Articles 
    
   static deleteArticle = (req, res, next) =>{
        Article.findOne({ _id: req.params.id }).then(
            (article) => {
                if (!article){
                   return res.status(404).json({
                        error: new Error('No such article')
                    });
                }
                Article.deleteOne({_id: req.params.id}).then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted'
                        });
                    }
                ).catch(
                    (error) => {
                       res.status(401).json({
                           error: error
                       });
                    }
                );
            }
        );
        
    };
    
    
    
    
    
    // Get all articles
    static getAllArticles= (req, res, next) => {
        Article.find().then(
            (articles) => {
                res.status(200).json(articles);
            }
        ).catch(
            (error) => {
                console.log(error);
                res.status(400).json({
                    error: error
                });
            }
        );
       
        };

}
export default ArticleCtrl