// [[file:../tutoring/Common/exercises.org::*Exercises][Exercises:5]]
Array.from(document.querySelectorAll(".questionList"),
           elt => { elt.addEventListener("click",hintListener);
                    return elt;});
// Exercises:5 ends here

// [[file:../tutoring/Common/exercises.org::*Exercises][Exercises:6]]
function hintListener(evt){
    //check if there is a request from answer-request
    if(evt.target.matches("span.answer-request")){
        //this should be the div.answer in the current li
        const ansDiv=evt.target.parentElement.querySelector("div.answer");
        if(ansDiv!==null) {
            //make the answer visible
            ansDiv.classList.toggle("hiddenContent");
            //this apparently checks if the element is obscured, see
            //https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
            //seems to be always false, no scrolling at all, investigate!
            //Probably would have to use the viewport size and the client rectangle
            //try this: compare bounding rectangle to document.documentElement.clientHeight,
            //if the top is bigger than that, it is below visibility->scroll to bottom,
            //if the bottom is negative it is above visibility -> scroll to top
            const elRect=ansDiv.getBoundingClientRect();
            //element bottom is below viewport
            if(elRect.bottom >= document.documentElement.clientHeight){
            //scroll it into view at the bottom
                ansDiv.scrollIntoView(false);
            } else if (elRect.top <= 0) {//past the top, shouldn't happen
                //scroll into view at top
                ansDiv.scrollIntoView();
            }
         }
        return false;
    }
    //check if there is a request from more-request
    if(evt.target.matches("span.more-request")){
        //where to get the function? from the dataset
        //add a list element to currentTarget
        const newLi=document.createElement("li");
        newLi.innerHTML=getMoreFunction(evt.target.dataset.call)();
        evt.currentTarget.appendChild(newLi);
        const elRect=newLi.getBoundingClientRect();
        //element bottom is below viewport
        if(elRect.bottom >= document.documentElement.clientHeight){
            //scroll it into view at the bottom
                newLi.scrollIntoView(false);
        } else if (elRect.top <= 0) {//past the top, shouldn't happen
                //scroll into view at top
                newLi.scrollIntoView();
        }
        //run mathjax on this
        MathJax.typesetPromise([evt.currentTarget]);
        return false;
    }
    //look for the <li> where the event came from
    const target = Array.from(evt.currentTarget.children).find( c => c.contains(event.target));
    //get the hint list, first try if there is a hidden one
    const hintList=target.querySelector("ol.hiddenHintList");
    if(hintList!==null){//hide individual list elements
        const hints=hintList.querySelectorAll("li");
        Array.prototype.slice.call(hints,1).map(
            li => {li.classList.add("hiddenHint"); return li;});
        hintList.classList.add("partialHintList");
        hintList.classList.remove("hiddenHintList");
    } else {
        //no hiddenHintList, try to find a partialHintList
        const partials=target.querySelector("ol.partialHintList");
        //target may be a sublist that doesn't contain hints, do nothing
        if(partials===null) return false;
        //try to get a list element of class hiddenHint
        const fstHidden=partials.querySelector("li.hiddenHint");
        if(fstHidden===null){
            //no more hiddenHints, reset the list back to everything hidden
            partials.classList.remove("partialHintList");
            partials.classList.add("hiddenHintList");
            //TODO:this should scroll the parent to the point of the last
            //visible hint, because this is where the reader is looking
        } else {
            //make the hint visible
            fstHidden.classList.remove("hiddenHint");
            //and scroll it into view from the bottom if necessary
            const elRect=fstHidden.getBoundingClientRect();
            //element bottom is below viewport
            if(elRect.bottom >= document.documentElement.clientHeight){
                //scroll it into view at the bottom
                    fstHidden.scrollIntoView(false);
            } else if (elRect.top <= 0) {//past the top, shouldn't happen
                    //scroll into view at top
                    fstHidden.scrollIntoView();
            }
        }
    }
    return false;
 }
// Exercises:6 ends here

// [[file:../tutoring/Common/exercises.org::*Utilities][Utilities:1]]
//a utility function to translate numbers to their latex equivalents in the requested
//precision
function toLatexPrecision(num,prec){
    let lastChar="";
    return Array.prototype.reduce.call(num.toPrecision(prec),
                                (acc,currChar)=>{
                                    switch(currChar){
                                    case " ": 
                                    case "+": return acc;
                                    case "e": lastChar="}";
                                              return acc+"\\times 10^{";
                                    default: return acc+currChar;
                                    }
                                },"")+lastChar;
}
// Utilities:1 ends here
