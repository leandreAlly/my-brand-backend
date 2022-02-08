const Message = require("../models/message");
const {messageValidation} = require("../validation");

class MessageCtrl {


  // Post message function
  static createMessage = (req, res, next) => {

  const {error}= messageValidation(req.body);
  if(error){
      return res.status(400).send(error.details[0].message);
  }
    const message = new Message({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    message.save().then(
      () => {
        res.status(201).json({
          message: 'message sent successfully'
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

  // Get all message function
  static getAllMessage = (req, res, next) => {
    Message.find().then(
        (messages) => {
            res.status(200).json(messages);
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

export default MessageCtrl;




  //   // Delete one message
  //   exports.deleteMessage = (req, res, next) =>{
  //     Message.findOne({ _id: req.params.id }).then(
  //         (messages) => {
  //             if (!messages){
  //                return res.status(404).json({
  //                     error: new Error('No such message')
  //                 });
  //             }
  //             messages.deleteOne({_id: req.params.id}).then(
  //                 () => {
  //                     res.status(200).json({
  //                         message: 'Deleted'
  //                     });
  //                 }
  //             ).catch(
  //                 (error) => {
  //                    res.status(401).json({
  //                        error: error
  //                    });
  //                 }
  //             );
  //         }
  //     );
      
  // };