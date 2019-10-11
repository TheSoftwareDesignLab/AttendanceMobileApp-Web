import { Component, ElementRef, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-random-quiz',
  templateUrl: './random-quiz.component.html',
  styleUrls: ['./random-quiz.component.scss']
})
export class RandomQuizComponent {
  private chartContainer: ElementRef;

  data;
  svg;
  contentWidth;
  contentHeight;
  angleScale;
  allOptions;
  optionsLeft;
  optionsDrawn;
  width;
  height;
  endAngle;

  margin = {top: 20, right: 20, bottom: 30, left: 40};

  constructor() { 
    this.data = d3.shuffle([
      {"name":"GOMEZ CUBILLOS, VIVIAN NATALIA"},
      {"name":"GOMEZ CUBILLOS, VIVIAN NATALIA"},
      {"name":"GOMEZ CUBILLOS, VIVIAN NATALIA"},
      {"name":"GOMEZ CUBILLOS, VIVIAN NATALIA"},
      {"name":"GOMEZ CUBILLOS, VIVIAN NATALIA"},
      {"name":"GOMEZ CUBILLOS, VIVIAN NATALIA"},
      {"name":"GOMEZ CUBILLOS, VIVIAN NATALIA"},
      {"name":"GOMEZ CUBILLOS, VIVIAN NATALIA"},
      {"name":"GOMEZ CUBILLOS, VIVIAN NATALIA"},
      {"name":"GOMEZ CUBILLOS, VIVIAN NATALIA"}
    ]);

    this.allOptions = this.data.map(function (d, i) {
      return {name:d, id:i, drawn:false};
    });
    this.optionsLeft = this.allOptions.map(function (d) { return d; });
    this.optionsDrawn = [];
    
    
    this.width = 800;
    this.height = 800;
    this.endAngle = 360 - 360/this.data.length ;

    this.svg = d3.select('svg').append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    this.angleScale = d3.scaleLinear()
    .domain([0, this.data.length-1])
    .range([0,360 - 360/this.data.length]);

    d3.select("#btnChoose")
    .on("click", this.onChooseM);
  }
  
  redraw(options) {
    var optionsSel = this.svg.selectAll(".option")
      .data(options);
  
    optionsSel.enter()
      .append("text")
      .attr("class", "option");
  
    optionsSel
      // .attr("x", width/2)
      // .attr("y", height/2)
      .attr("id", function (d) { return "id"+ d.id; })
      .classed("drawn", function(d) { return d.drawn; })
      .text(function(d) { return d.name; })
      .transition().duration(1000)
      .attr("transform", function (d) {
        return "translate(" + 800/2 + "," + 800/2  +
          ") rotate(" + this.angleScale(d.id) + ")" +
          ", translate(30,0)";
      });
  
    optionsSel.exit().remove();
  
  }
  
  //this.redraw(this.allOptions);
  
  onChooseM() {
    var sel = Math.floor(Math.random() * this.optionsLeft.length);
    var optionSel = this.optionsLeft.splice(sel, 1)[0];
  
    if(optionSel === undefined) {
      console.log("No more options left");
      alert("No more options left");  // Optional
    }
  
    optionSel.drawn = true;
    this.optionsDrawn = [optionSel].concat(this.optionsDrawn);
    this.angleScale
      .range([0, this.endAngle]);
    var selAngle = this.angleScale(optionSel.id);
  
    console.log("sel="+ sel +" angle="+selAngle + " option " + optionSel.name);
  
    this.angleScale.range([-selAngle, this.endAngle-selAngle]);
    console.log("#id "+sel);
    d3.selectAll(".option")
      .classed("selected", false);

    this.redraw(this.allOptions);
    console.log("#id" + optionSel.id);
    d3.select("#id" + optionSel.id)
      .classed("selected", true);
  
    const drawn = d3.select("#drawn").selectAll(".drawn")
      .data(this.optionsDrawn);
  
    drawn.enter()
      .append("p");
    drawn
      .attr("class", "drawn")
      .text(this.data.name);
    drawn.exit().remove();
  }
}
