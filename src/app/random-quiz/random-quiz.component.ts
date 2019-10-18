import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import * as p5 from 'p5';
@Component({
  selector: 'app-random-quiz',
  templateUrl: './random-quiz.component.html',
  styleUrls: ['./random-quiz.component.scss']
})
export class RandomQuizComponent implements OnInit, OnDestroy {
  course: string;
  students: any[];

  constructor(private db: AngularFirestore, private route: ActivatedRoute) {
    this.students = [];
    this.route.paramMap.subscribe(params => {
      this.course = params.get('courseID');
    });

    db.collection('2019-20')
      .doc(this.course + '')
      .collection('students')
      .valueChanges()
      .subscribe(
        x => {
          this.students = x;
        },
        e => {},
        () => {}
      );
  }
  private p5;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.course = params.get('courseID');
    });
    this.createCanvas();
  }

  ngOnDestroy(): void {
    this.destroyCanvas();
  }

  private destroyCanvas = () => {
    this.p5.noCanvas();
  };

  createCanvas() {
    this.p5 = new p5(this.sketch);
  }

  private sketch = (p: any) => {
    let velocity = 0;
    let force = 0.05;
    let initialRotation = p.random(0, p.TWO_PI);
    let students = this.students;
    p.setup = () => {
      p.createCanvas(800, 800).parent('sketch-holder');
      p.textSize(16);
    };

    p.draw = () => {
      if (this.students.length == 0) {
        p.text('Loading...', 10, 30);
      } else {
        // students = [
        //   { name: 'andres' },
        //   { name: 'lucas' },
        //   { name: 'sebastian' },
        //   { name: 'andres2' },
        //   { name: 'lucas3' },
        //   { name: 'sebastian4' }
        // ];
        students = this.students;
        p.background(254, 237, 54);
        p.textStyle(p.BOLD);
        p.text('press enter to spin the Wheel!', 10, 10);
        p.translate(p.width / 2, p.height / 2);
        let wheel = new Wheel(0, 0, 750, students.length);
        wheel.draw();
        p.push();
        p.stroke(255, 0, 0);
        p.strokeWeight(2);
        p.line(p.width / 2, 0, p.width / 4, 0);
        p.pop();

        if (velocity <= 0) {
          velocity = 0;
        } else {
          velocity = velocity - velocity * force;
        }
      }
    };

    p.keyPressed = () => {
      if (p.keyCode === p.ENTER) {
        velocity += p.random(1000, 4000);
        initialRotation = p.random(0, p.TWO_PI);
      }
    };

    class Wheel {
      cx: any;
      cy: any;
      r: any;
      numSpokes: any;

      constructor(cx, cy, r, numSpokes) {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.numSpokes = numSpokes;
      }

      draw() {
        p.push();
        p.rotate(0);
        p.rotate(initialRotation);
        p.rotate(p.radians(velocity));
        p.ellipse(0, 0, this.r);
        let dist = 360 / this.numSpokes;
        for (let i = 0; i < this.numSpokes; i++) {
          let dir = p5.Vector.fromAngle(p.radians(dist * i));
          p.push();
          p.rotate(dir.heading());
          let readout = students[i].name;
          p.textStyle(p.BOLD);
          p.text(readout, this.r / 5, 0);
          p.pop();
          p.line(0, 0, (dir.x * this.r) / 2, (dir.y * this.r) / 2);
        }
        p.pop();
      }
    }
  };
}
