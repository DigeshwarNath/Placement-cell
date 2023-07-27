const json2csv=require('json2csv')
const Student=require('..student')
const Interview=require('..interview')
const fs=require('fs')

module.exports.download = async function (req, res) {
            try {
            const arrayStudent = await Student.find({});
            let serialNumber = 1,
                entry = "";
            let fileData =
                "S.No, Name, Email, Batch, Status, DSA, WebD, React, Interview, Date, Result";
            for (var student of arrayStudent) {
                entry =
                serialNumber +
                "," +
                student.name +
                "," +
                student.email +
                "," +
                student.batch +
                "," +
                student.status +
                "," +
                student.dsa_score +
                "," +
                student.webD_score +
                "," +
                student.react_score;
                if (student.interviews.length > 0) {
                for (var interview of student.interviews) {

                    // console.log(interview.date)

                    
                    entry  +=

                    "," +
                    interview.company +
                    "," +
                    interview.date +
                    "," +
                    interview.result;
                }
                }
                serialNumber++;

                fileData += "\n" + entry;
            }
            const file = fs.writeFile(
                "data.csv",
                fileData,
                function (err, data) {
                if (err) {
                    console.log(err);
                    return res.redirect("back");
                }
                // req.flash("success", "Details Downloaded Successfully!!");
                res.download("data.csv");
                // res.redirect('/')
                }
            );
            console.log("csv")
            } catch (err) {
            console.log(err);
            }
};
