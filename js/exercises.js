// [[file:../tutoring/Common/exercises.org::*Exercises][Exercises:5]]
Array.from(document.querySelectorAll(".questionList"),
           elt => { elt.addEventListener("click",hintListener);
                    return elt;});
// Exercises:5 ends here

// [[file:../tutoring/Common/exercises.org::*Exercises][Exercises:6]]
function hintListener(evt){
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
        } else {
            //make the hint visible
            fstHidden.classList.remove("hiddenHint");
        }
    }
    return false;
 }
// Exercises:6 ends here
