//Draw Bar Graph
function DrawBargraph(sampleID)
{
    console.log(`DrawBarGraph(${sampleID})`);

    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];


        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(), //TBD
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}

        }


        Plotly.newPlot("bar", [barData], barLayout);
    });

}

//Draw Bubble Chart
function DrawBubbleChart(sampleID)


{

    console.log(`DrawBubbleChart(${sampleID})`);

    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];


        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values
              },
            
            text: otu_labels

        }

        var bubbleLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}

        }


        Plotly.newPlot("bubble", [bubbleData], bubbleLayout);
    });

    


}


//Show Data in Drop Down
function ShowMetadata(sampleID)
{
    console.log(`ShowMetadata(${sampleID})`);

        d3.json("samples.json").then((data) => {

            var metadata = data.metadata;
            var resultArray = metadata.filter(md => md.id == sampleID);
            var result = resultArray[0];

            var panel = d3.select(`#sample-metadata`);
            panel.html("");

            Object.entries(result).forEach(([key ,value]) => {
              
                var textToShow = `${key} = ${value}`;
                panel.append("h6").text(textToShow);

            })

        });
}


function optionChanged(newSampleID)
{
    console.log(`User Selected ${newSampleID}`);

    DrawBargraph(newSampleID);
    DrawBubbleChart(newSampleID);
    ShowMetadata(newSampleID);
}


function InitDashboard()
{
    console.log(`Calling InitDashboard()`);
    
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data);

        var sampleNames = data.names;

        //Populate the selector with the Sample IDs
        sampleNames.forEach((sampleID) => {
            selector.append("option")
            .text(sampleID)
            .property("value", sampleID);
        })

        var sampleID = sampleNames[0];
        console.log("Starting Sample: ", sampleID);

        DrawBargraph(sampleID);
        DrawBubbleChart(sampleID);
        ShowMetadata(sampleID);
    });
}

InitDashboard();