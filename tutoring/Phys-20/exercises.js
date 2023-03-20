// [[file:generated.org::*General Procedure][General Procedure:1]]
//Code for generating physics exercises.
// General Procedure:1 ends here

// [[file:generated.org::*General Procedure][General Procedure:2]]
function getMoreFunction(fstring){
    switch(fstring){
    case "projectiles":return projectiles;
    case "initvelocity":return initvelocity;
    case "fallpath":return fallpath;
    case "crossingDirection":return crossingDirection;
    case "simplePullAcceleration":return simplePullAcceleration;
    case "notImplemented":return notImplemented;
    case "underConstruction":return underConstruction;
    default: return (()=> "No function "+fstring+" known to match");
    }
}
// General Procedure:2 ends here

// [[file:generated.org::*Falling Objects][Falling Objects:1]]
function notImplemented(){
          return "sorry, this is not implemented yet";
      }
      function underConstruction(){
          return "under construction, come back soon.";
      }
      function initvelocity(){
          const speed= (() => {const rv=Math.random()*1000+1;//1 to 1000 m/s
                              if(rv<10){//want 3 significant digits
                                  return Math.round(rv*100)/100;
                              } else if(rv<100){//want 3 significant digits
                                  return Math.round(rv*10)/10;
                              } else {
                                  return Math.round(rv);
                              }})();
          const speedString = toLatexPrecision(speed,3);
          //and angles between -60 and 60 degrees
          const angle= Math.floor(Math.random()*121)-60;
          const angleString=toLatexPrecision(angle,3);
          //note javascript is in rad mode
          const angleRad=angle*Math.PI/180;
          const horizontalString=toLatexPrecision(speed*Math.cos(angleRad),3)
          const verticalString=toLatexPrecision(speed*Math.sin(angleRad),3)
          return `<p>
  An object is launched at speed \\(${speedString}\\)m/s at an angle of
  \\(${angleString}^\\circ\\) with respect to the horizontal. Determine its
  initial velocity, its initial horizontal velocity and its
  initial vertical velocity.
  </p>

  Click to see the <span class="answer-request">answer</span>, <span class="hint-request">hints</span> or generate
  <span class="more-request" data-call="initvelocity">more</span> questions of this type.
  <div class="answer hiddenContent div">
  <p>
  Initial velocity: \\((${horizontalString},${verticalString})\\) m/s, Horizontal:\\(${horizontalString}\\) m/s, Vertical: \\(${verticalString}\\) m/s
  </p>

  </div>
  <ol class="org-ol hiddenHintList">
  <li>Angles with respect to the horizontal are cartesian angles,</li>
  <li>the speed is the magnitude of the velocity,</li>
  <li>therefore the initial velocity is
  \\[\\vec{v}=(${speedString}\\cos(${angleString}),${speedString}\\sin(${angleString}))=(${horizontalString}, ${verticalString})\\frac{\\text{m}}{\\text{s}}.\\]</li>
  <li>Its first component \\(${horizontalString}\\) m/s is the initial horizontal velocity.</li>
  <li>Its second component \\(${verticalString}\\) m/s is the initial vertical velocity.</li>
  </ol>` ;
      }
  function fallpath(){
        const speed= (() => {const rv=Math.random()*1000+1;//1 to 1000 m/s
                            if(rv<10){//want 3 significant digits
                                return Math.round(rv*100)/100;
                            } else if(rv<100){//want 3 significant digits
                                return Math.round(rv*10)/10;
                            } else {
                                return Math.round(rv);
                            }})();
        const speedString = toLatexPrecision(speed,3);
        //originally from 0.1 to 1000 seconds, which was too much
        const time= (() => {const rv=Math.random()*11+0.01;//0.01 to 10.01 s
                            if(rv<1){//want 3 significant digits
                                return Math.round(rv*1000)/1000;
                            } else if(rv<10){//want 3 significant digits
                                return Math.round(rv*100)/100;
                            } else if(rv<100){//want 3 significant digits
                                return Math.round(rv*10)/10;
                            } else {
                                return Math.round(rv);
                            }})();
        const timeString = toLatexPrecision(time,3);
        //and angles between -60 and 60 degrees
        const angle= Math.floor(Math.random()*121)-60;
        const angleString=toLatexPrecision(angle,3);
        //note javascript is in rad mode
        const angleRad=angle*Math.PI/180;
        const range=speed*Math.cos(angleRad)*time;
        const rangeString=toLatexPrecision(range,3);
        const height=speed*Math.sin(angleRad)*time-4.905*time*time;
        const heightString=toLatexPrecision(height,3);
        const absHeightString=toLatexPrecision(Math.abs(height),3);
        const abovebelow=height => height<0?"above":"below";
        const downup=height => height<0?"down":"up";
//TODO: wording: if height string is negative
        return `<p>
An object is launched at \\(${speedString}\\) m/s at \\(${angleString}^\\circ\\) to the horizontal. It hits the
ground after \\(${timeString}\\) s. Determine its range and the height from which it was launched.
</p>
Click to see the <span class="answer-request">answer</span>, <span class="hint-request">hints</span> or generate
<span class="more-request" data-call="fallpath">more</span> questions of this type.
<div class="answer hiddenContent div">
<p>
Range: \\(${rangeString}\\) m, Height: \\(${absHeightString}\\) m
</p>

</div>

<ol class="org-ol hiddenHintList">
<li>The initial velocity is given by
\\[\\vec{v}_i=(${speedString}\\cos(${angleString}),${speedString}\\sin(${angleString})),\\]</li>
<li>which results in a trajectory of
\\[(d_x,d_y)=(${speedString}\\cos(${angleString}),${speedString}\\sin(${angleString}))t+\\frac{1}{2}(0,-9.81)t^2.\\]</li>
<li>At time \\(t=${timeString}\\) s, this becomes
\\[(d_x,d_y)=(${speedString}\\cos(${angleString}),${speedString}\\sin(${angleString}))${timeString}+\\frac{1}{2}(0,-9.81)${timeString}^2,\\]</li>
<li>or
\\[(d_x,d_y)=(${rangeString}, ${heightString}).\\]</li>
<li>This means its range is \\(d_x=${rangeString}\\) m and</li>
<li>\\(d_y=${heightString}\\) indicates that it went \\(${absHeightString}\\) m
${downup(height)} before impact, hence</li>
<li>it was launched from \\(${absHeightString}\\) m ${abovebelow(height)}
     the impact point.</li>
</ol>`;

  }
// Falling Objects:1 ends here

// [[file:generated.org::*Projectiles][Projectiles:1]]
function projectiles(){
    //using speeds between 10 and 500 m/s
    const speed= (() => {const rv=Math.random()*491+10;//10 to 500 m/s
                        if(rv<100){//want 3 significant digits
                            return Math.round(rv*10)/10;
                        } else {
                            return Math.round(rv);
                        }})();
    const speedString = toLatexPrecision(speed,3);
    //and angles between 0 and 60 degrees
    const angle= Math.floor(Math.random()*61);//using angles between 0 and 60 degrees
    const angleString=toLatexPrecision(angle,3);
    //note javascript is in rad mode
    const angleRad=angle*Math.PI/180;
    const range=2*speed*speed*Math.cos(angleRad)*Math.sin(angleRad)/9.81;
    const height=speed*speed*Math.sin(angleRad)*Math.sin(angleRad)/(2*9.81);
    const rangeString=toLatexPrecision(range,3);
    const heightString=toLatexPrecision(height,3);
return `<p>An object is launched at \\(${speed}\\frac{\\text{m}}{\\text{s}}\\) at an angle of \\(${angleString}^\\circ\\) to the
horizontal. Determine its range and maximum height.
</p>
Click to see the <span class="answer-request">answer</span>, <span class="hint-request">hints</span> or generate
<span class="more-request" data-call="projectiles">more</span> questions of this type.
<div class="answer hiddenContent div" >
<p>
Range: \\(${rangeString}\\)m, Height: \\(${heightString}\\)m
</p>
</div>
<ol class="org-ol hiddenHintList">
<li>The initial velocity is \\(\\vec{v}=(${speedString}\\cos ${angleString},${speedString}\\sin ${angleString})\\) and the acceleration</li>
<li>is \\(\\vec{a}=(0,-9.81)\\). This motion is described by</li>
<li>the equation \\[(d_x,d_y)=(${speedString}\\cos ${angleString} ,${speedString}\\sin ${angleString} )t+\\frac{1}{2}(0,-9.81)t^2,\\]</li>
<li>which has horizontal component \\(d_x=${speedString}\\cos ${angleString} t\\) and vertical component</li>
<li>\\(d_y=${speedString}\\sin ${angleString} t-\\frac{1}{2}9.81t^2\\).</li>
<li>Since the range is to be determined, the time \\(t\\) has to be found when the object
hits the ground, ie when the vertical displacement from the ground is \\(d_y=0\\).</li>
<li>From the vertical component of the motion, this puts the requirement
\\[0=${speedString}\\sin ${angleString} t-\\frac{1}{2}9.81t^2=t(${speedString}\\sin ${angleString} -\\frac{1}{2}9.81t)\\] on \\(t\\).</li>
<li>This is satisfied when \\(t=0\\) or
\\[${speedString}\\sin ${angleString} -\\frac{1}{2}9.81t=0,\\]</li>
<li>with the latter \\(t\\) being of interest because that represents the time when
the object lands.</li>
<li>Solving for \\(t\\), this becomes
\\[t=\\frac{2\\times ${speedString}\\sin ${angleString} }{9.81}.\\]</li>
<li>To find the range, this has to be inserted back into the horizontal component,
which becomes
\\[d_x=${speedString}\\cos ${angleString} \\frac{2\\times ${speedString}\\sin ${angleString} }{9.81}=\\frac{2\\times${speedString}^2\\sin ${angleString} \\cos ${angleString} }{9.81}=${range},\\]
so the range is \\(${toLatexPrecision(range,3)}\\)m after rounding to three significant digits.</li>
<li>For the height, \\[0=\\sin^2${angleString}\\times ${speedString}^2-2\\times9.81 d_y\\] needs to be computed,</li>
<li>which leads to \\[d_y=\\frac{${speedString}^2\\sin^2${angleString}}{2\\times 9.81}=${height},\\]
or \\(${toLatexPrecision(height,3)}\\)m when rounded to three significant digits</li>
</ol>`;
}
// Projectiles:1 ends here

// [[file:generated.org::*Relative Motion][Relative Motion:1]]
function crossingDirection(){
      //using speeds between 0.1 and 10 m/s
      const riverSpeed= (() => {const rv=Math.random()*10+0.1;
                          if(rv<10){//want 3 significant digits
                              return Math.round(rv*100)/100;
                          } else if(rv<1){//want 3 significant digits
                              return Math.round(rv*1000)/1000;
                          } else {
                              return Math.round(rv);
                          }})();
      const riverSpeedString = toLatexPrecision(riverSpeed,3);
      //and angles between 0 and 180 degrees
      const riverAngle= Math.floor(Math.random()*180);
      const riverAngleString=toLatexPrecision(riverAngle,3);
      const riverAngleRad=riverAngle*Math.PI/180;
      //1 to 20 m/s up to 80 km/h
      const boatSpeed= (() => {const rv=Math.random()*20+1;
                          if(rv<10){//want 3 significant digits
                              return Math.round(rv*100)/100;
                          } else {
                              return Math.round(rv);
                          }})();
      const boatSpeedString = toLatexPrecision(boatSpeed,3);
      //and angles between 0 and 60 degrees
      const boatAngle=riverAngle+90.0; //what about
      const boatAngleString=toLatexPrecision(boatAngle,3);
      const boatAngleRad=boatAngle*Math.PI/180;
      const river_x=riverSpeed*Math.cos(riverAngleRad);
      const river_xString=toLatexPrecision(river_x,3);
      const river_y=riverSpeed*Math.sin(riverAngleRad);
      const river_yString=toLatexPrecision(river_y,3);
      const boat_x=boatSpeed*Math.cos(boatAngleRad);
      const boat_xString=toLatexPrecision(boat_x,3);
      const boat_y=boatSpeed*Math.sin(boatAngleRad);
      const boat_yString=toLatexPrecision(boat_y,3);
      const combined_x=boat_x+river_x;
      const combined_xString=toLatexPrecision(combined_x,3);
      const combined_y=boat_y+river_y;
      const combined_yString=toLatexPrecision(combined_y,3);
      const resultSpeedString=toLatexPrecision(Math.sqrt(combined_x*combined_x+combined_y*combined_y),3);
      const resultAngleString=(() => {const rad=Math.atan2(combined_y,combined_x);
                                     const deg=rad*180/Math.PI;
                                     return toLatexPrecision(deg<0?360+deg:deg,3);
                                     })();


      return `<p>
  A boat running at \\(${boatSpeedString}\\) m/s relative to the water crosses a river flowing \\(${riverSpeedString}\\) m/s
  at \\(${riverAngleString}^\\circ\\). Determine the velocity of the boat relative to an observer at rest
  watching from a river bank if the boat goes straight across at a right angle
  to the river.
  </p>
  Click to see the <span class="answer-request">answer</span>, <span class="hint-request">hints</span> or generate
  <span class="more-request" data-call="crossingDirection">more</span> questions of this type.
  <div class="answer hiddenContent div">
  <p>
  \\(${resultSpeedString}\\) m/s at \\(${resultAngleString}^\\circ\\).
  </p>

  </div>
  <ol class="org-ol hiddenHintList">
  <li>Since the direction of \\(${riverAngleString}^\\circ\\) represents a cartesian angle
  the velocity of the water with respect to ground is</li>
  <li>\\[\\vec{v}_1=(${riverSpeedString}\\cos ${riverAngleString},8.0\\sin ${riverAngleString})=(${river_xString}, ${river_yString})\\frac{\\text{m}}{\\text{s}}.\\]</li>
  <li>The boat runs at an angle of \\(90.0^\\circ\\) with respect to the river, hence at
  a cartesian angle of \\(${riverAngleString}^\\circ+90.0^\\circ=${boatAngleString}^\\circ\\).</li>
  <li>Therefore, the boat's velocity vector is
  \\[\\vec{v}_2=(${boatSpeedString}\\cos ${boatAngleString},${boatSpeedString}\\sin ${boatAngleString})=(${boat_xString}, ${boat_yString})\\frac{\\text{m}}{\\text{s}}.\\]</li>
  <li>The velocity with repect to the stationary observer is
  \\[\\vec{v}_1+\\vec{v}_2=(${river_xString}, ${river_yString})
                          +(${boat_xString}, ${boat_yString})
                          =(${combined_xString}, ${combined_yString})\\frac{\\text{m}}{\\text{s}},\\]which</li>
  <li>has length \\[\\sqrt{${combined_xString}^2+${combined_yString}^2}=${resultSpeedString}\\text{m/s},\\] and
  </li><li>
  cartesian angle \\(${resultAngleString}\\). </li>
  </ol>`;
}
// Relative Motion:1 ends here

// [[file:generated.org::*Pulling Objects][Pulling Objects:1]]
function simplePullAcceleration(){
      const mass=Math.floor(Math.random()*90)+10; //10 to 99 kg
      const massString=toLatexPrecision(mass,3);
      const acc=(()=> {const rac=Math.random()*10+0.1;
                       if (rac<1.0) {
                           return Math.round(1000*rac)/1000;
                       } else if (rac<10.0) {
                           return Math.round(100*rac)/100;
                       } else {
                           return Math.round(10*rac)/10;
                       }})();
      const accelString=toLatexPrecision(acc,3);
      const friction=Math.floor(Math.random()*90)+10; //10 to 99 N
      const frictionString=toLatexPrecision(friction,3);
      const netForce=-mass*acc;
      const netForceString=toLatexPrecision(netForce,3);
      const applied=netForce-friction;
      const appliedString=toLatexPrecision(applied,3);
      const appliedAbsString=toLatexPrecision(Math.abs(applied),3);
      return `<p>
How much force needs to be applied to a \\(${massString}\\) kg object to accelerate it at
\\(${accelString}\\text{m}/\\text{s}^2\\) if there is a friction force of \\(${frictionString}\\) N?
</p>
Click to see the <span class="answer-request">answer</span>, <span class="hint-request">hints</span> or generate
<span class="more-request" data-call="simplePullAcceleration">more</span> questions of this type.
<div class="answer hiddenContent div">
<p>
\\(${appliedAbsString}\\) N opposite to the friction force.
</p>
</div>
<ol class="org-ol hiddenHintList">
<li><p>
With the applied force \\(\\vec{F}_a\\) and the friction force \\(\\vec{F}_f\\) acting on
the object, the net force \\(\\vec{F}_\\text{net}\\) becomes
</p>
\\[
\\vec{F}_\\text{net}=\\vec{F}_a+\\vec{F}_f
\\] according to equation (\\ref{dyn1 force equation}).</li>
<li>Since the net force is the force accelerating the object, it is related to the
acceleration by Newton's second law
\\[\\vec{F}_\\text{net}=m\\vec{a}=${accelString}\\times ${massString}=2${frictionString}.\\]</li>
<li>The friction force always acts opposite to the net force, so with a positive
friction force, the net force is negative</li>
<li>and equation (\\ref{dyn1 force equation}) becomes
\\[${netForceString}=\\vec{F}_a+${frictionString}\\]</li>
<li>Solving for \\(\\vec{F}_a\\) results in</li>
<li>\\(\\vec{F}_a=${appliedString}\\) N, hence</li>
<li>a force of \\(${appliedAbsString}\\) N opposite to the friction force needs to be applied to
the object.</li>
</ol>`;
      }
// Pulling Objects:1 ends here
