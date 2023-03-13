//functions to generate exercises
// Procedure: add a span to the question with class more-request and a data attribute
//data-call whose value is a function name
//The function registry
function getMoreFunction(fstring){
    switch(fstring){
    case "projectiles":return projectiles;
    default: return (()=> "No function "+fstring+" known to match")
    }
}
//exercises with projectiles. TODO: adjust to new setup, add spans for answer, hints and
//more request as well as a hidden answer div, the text of the question seems now wrapped
//in a paragraph
function projectiles(){
    const speed= (() => {const rv=Math.random()*491+10;//10 to 500 m/s
                        if(rv<100){//want 3 significant digits
                            return Math.round(rv*10)/10;
                        } else {
                            return Math.round(rv);
                        }})();
    const speedString = speed.toPrecision(3);
    const angle= Math.floor(Math.random()*61);//using angles between 0 and 60 degrees
    const angleString=angle.toPrecision(3);
    const angleRad=angle*Math.PI/180;
    const range=2*speed*speed*Math.cos(angleRad)*Math.sin(angleRad)/9.81;
    const height=speed*speed*Math.sin(angleRad)*Math.sin(angleRad)/(2*9.81);          
    //Number.toPrecision(), x.toPrecision(4) -> x with 4 siginificant digits, does
    //conversion to scientific if necessary
//and put them in the template literal, which is then returned
return `An object is launched at \\(${speed}\\frac{\\text{m}}{\\text{s}}\\) at an angle of \\(${angleString}^\\circ\\) to the
horizontal. Determine its range and maximum height.
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
so the range is \\(${range.toPrecision(3)}\\)m after rounding to three significant digits.</li>
<li>For the height, \\[0=\\sin^2${angleString}\\times ${speedString}^2-2\\times9.81 d_y\\] needs to be computed,</li>
<li>which leads to \\[d_y=\\frac{${speedString}^2\\sin^2${angleString}}{2\\times 9.81}=${height},\\]
or \\(${height.toPrecision(3)}\\)m. when rounded to three significant digits</li>
</ol>`;
}
