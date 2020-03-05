//Display date in header using moment.js//
$("#currentDay").text(moment().format('LLLL'))

//Time array to be displayed in time column//
let times = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]
//24 hour time array to be used in 'value' attribute//
let value = [9, 10, 11, 12, 13, 14, 15, 16, 17]

//create elements for timeblocks//
for (let i = 0; i < times.length; i++) {
    const timeContainer = $(".container")
    const timeRow = $("<div> </div>").attr("class", "row")
    //column with times displayed//
    const timeColumn = $("<div> </div>").attr("class", "hour").text(times[i])
    //Columns for task display, also append 'text area' input box to appear within commentColumn//
    const commentColumn = $("<div> </div>").attr("value", value[i])
    const textArea = $("<textarea> </textarea>")
    commentColumn.append(textArea)
    //setting 'past', 'present' and 'future' class attributes to commentColumn//
    if (value[i] == moment().format('H')) {
        commentColumn.attr("class", "present")
    }
    else if (value[i] > moment().format('H')) {
        commentColumn.attr("class", "future")
    }
    else { commentColumn.attr("class", "past") }

    //If there are any items in Local Storage, append to commentColumnm//
    const tasks = JSON.parse(localStorage.getItem(times[i]))
    if (tasks !== null) {
        commentColumn.text(tasks)
    }
    //column with save buttons//
    const saveButton = $("<div></div>").attr("class", "saveBtn").text("save")
    //append children to time row//
    timeRow.append(timeColumn, commentColumn, saveButton)
    timeContainer.append(timeRow)

    //save text//
    saveButton.on("click", function () {
        const input = textArea.val()
        commentColumn.text(input)
        localStorage.setItem(times[i], JSON.stringify(input))
    })

}
