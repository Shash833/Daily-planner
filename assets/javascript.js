//Display current date in header using moment.js//
$("#currentDay").text(moment().format('LLLL'))

//Time array to be displayed in time column//
let times = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]
//24 hour time array to be used in 'value' attribute//
let value = [9, 10, 11, 12, 13, 14, 15, 16, 17]

//create timeblocks and allow user to update them //
for (let i = 0; i < times.length; i++) {
    const timeContainer = $(".container")
    const timeRow = $("<div>").attr("class", "row")

    //column with times displayed//
    const timeColumn = $("<div>").attr("class", "hour").text(times[i])

    //textArea input box to appear within 'textColumn'//
    const textColumn = $("<div>").attr("value", value[i])
    const textArea = $("<textarea>")
    textColumn.append(textArea)

    //Get any items in Local Storage with today's date and display in textArea//
    const tasks = JSON.parse(localStorage.getItem(moment().format('ll') + " - " + times[i]))
    if (tasks !== null) {
        textArea.text(tasks)
    }
    //color code textColumn by setting 'past', 'present' and 'future' class attributes using current hour from moment.js//
    if (value[i] == moment().format('H')) {
        textColumn.attr("class", "present")
    }
    else if (value[i] > moment().format('H')) {
        textColumn.attr("class", "future")
    }
    else { textColumn.attr("class", "past") }

    //create column with save buttons//
    const saveButton = $("<div>").attr("class", "saveBtn")
    saveButton.append($("<i>").attr("class", "fas fa-lock"))

    //append children to time row//
    timeRow.append(timeColumn, textColumn, saveButton)
    timeContainer.append(timeRow)

    //after 'save' button is clicked, save input under today's date to local storage//
    saveButton.on("click", function () {
        const input = textArea.val().trim()
        localStorage.setItem((moment().format('ll') + " - " + times[i]), JSON.stringify(input))
    })

}
