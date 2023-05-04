csv = $.ajax({type: "GET", url: "stipend-us.csv", async: false}).responseText
data = $.csv.toArrays(csv)
for (i = 0; i < data.length; i++) {
    data[i][1] = Number(data[i][1])
    data[i][2] = Number(data[i][2])
}

function sort_and_display(subtract_living) {
    $("#ranking").find("tbody").html("")

    data.sort(function(a, b) {
        if (subtract_living)
            return (b[1] - b[2]) - (a[1] - a[2])
        else
            return b[1] - a[1]
    })

    console.log(data)

    for (i = 0; i < data.length; i++) {
        $("#ranking").find("tbody").append(
            $("<tr>")
                .append($("<td>").text(i+1))
                .append($("<td>").text(data[i][0]))
                .append($("<td>").text(data[i][1]).attr("align", "right"))
                .append($("<td>").text(data[i][2]).attr("align", "right"))
        )
    }
}

$("#overlay-loading").hide()

sort_and_display(false)

$("#living-wage").on("click", function() {
    sort_and_display($("#living-wage").is(":checked"))
})