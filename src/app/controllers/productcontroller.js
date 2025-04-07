// const course =require('../models/course');
// const {mongooseToObj} =require('../../util/mongoose');
// class coursescontroller {

//     // [GET] course/:slug
//     show(req, res,next ) {
//        course.findOne({slug:req.params.slug})
//        .then(course=>{
//         res.render('course/show',{
//             course:mongooseToObj(course)
//         });
//        })
//        .catch(next);
//     }
//    //[GET] /course/create
//     create(req, res, next){
//         res.render('course/create');
//     }

//     //[POST] /course/store
//     store(req, res, next){
//         const data =req.body;
//       data.img=`https://files.fullstack.edu.vn/f8-prod/courses/6.png`;
//       const newcourse = new course(data);
//       newcourse.save();
//       res.send('SAVE');

//     }
// }

// module.exports = new coursescontroller();
