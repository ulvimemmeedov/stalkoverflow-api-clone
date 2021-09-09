// Controller class Questions

class QuestionsController {

    getAllQuestions = (req,res,next) => {

        res
        .status(200)
        .json({
            success:true
        });

    };
}

module.exports = new QuestionsController();