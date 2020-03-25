$(function() {
    function addStudentDiv(item, parentDiv) {
        // Place DOM creation here
        var rowDiv = $("<div></div>");
        var imgDiv = $("<div></div>");
        var img = $("<img />");
        var infoDiv = $("<div></div>");
        var name = $("<h4></h4>");
        var idNum = $("<p></p>");

        // Add the classes for each div element
        $(rowDiv).addClass('row student');
        $(imgDiv).addClass('col-sm-2 center');
        $(infoDiv).addClass('col-sm-10');

        // Set the attributes of the elements in order to show the correct info of each student
        $(img).attr("src", item.img);
        $(name).text(item.name);
        $(idNum).text(item.id);

        // Append all the elements to its respective div element
        $(imgDiv).append(img);
        $(infoDiv).append(name);
        $(infoDiv).append(idNum);

        // Append all the div elements to the parent div
        $(rowDiv).append(imgDiv);
        $(rowDiv).append(infoDiv);

        // Lastly, append the entire parent div to the main div containing the list of students
        parentDiv.append(rowDiv);
    }

    $.get('getStudents', function(data, status) {
        var studentList = $('#studentList');
        // console.log(data);

        // Append each student from database to the list for display
        data.forEach((item, i) => {
            addStudentDiv(item, studentList);
        });
    });

    $('#addStudent').click(function() {
        // Retrieve form data
        var name = $('#name').val();
        var idnum = $('#idnum').val();
        var gender = $("input[name='gender']:checked").val();

        // Create a JS object to be sent to the server
        var newStudent = {
            name: name,
            idnum: idnum,
            gender: gender
        };

        $.post('addStudent', newStudent, function(data, status) {
            var studentList = $('#studentList');
            addStudentDiv(data, studentList);
        })
    });
});
