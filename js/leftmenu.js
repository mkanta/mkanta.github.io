// [[file:js.org::*The Code][The Code:1]]
(function setupMenu(){
   //get the first anchor in table-of-contents and set it to active
   const toc=document.querySelector("#text-table-of-contents");
   const fstAnchor=toc.querySelector("a");
   //const fstDiv=document.querySelector(fstAnchor.hash).parentElement;
   //get the href of the anchor and set the correponding container to top-left
   fstAnchor.classList.add("on-display");
   //attach the anchorListener to the table of contents
   //fstDiv.classList.add("top-left");
   toc.addEventListener("click",anchorListener);
   //Set up the menu observer
      const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(reverseMenuHandler, options);
    Array.prototype.map.call(document.querySelectorAll("div[id^='outline-container-org']"),
                         cont => {observer.observe(cont.firstElementChild);return cont;});

})();
// The Code:1 ends here

// [[file:js.org::*The Code][The Code:2]]
//attach this to the toc container
//TODO: implement folding
function anchorListener(evt){
    if(evt.target.tagName!=="A") return false;
    evt.preventDefault();
    //there should only be one anchor on-display, so this would
    //be overkill, just do querySelector(".on-display")
    Array.from(evt.currentTarget.querySelectorAll(".on-display"),
               li => {li.classList.remove("on-display"); return li;});
    evt.target.classList.add("on-display");
    /*
    Array.from(document.querySelectorAll(".top-left"),
               divelt => {divelt.classList.remove("top-left"); return divelt;});*/
    //do this if the headline contains no anchor
    //hash is the id of the headline, so its parent element is the container to be placed.
    const currHead=document.querySelector(evt.target.hash);
    const headLink=currHead.querySelector("a");
    if(headLink!==null){
        //follow href, or should this be href+"#"+tag? TODO:experiment
        window.location.assign(headLink.href);
    } else {
        const currContainer=currHead.parentElement
        currContainer.scrollIntoView();
        //currContainer.scrollTop=50; //doesn't seem to do anything
    }
    return false;
}
// The Code:2 ends here

// [[file:js.org::*The Code][The Code:4]]
function reverseMenuHandler(entries,observer){
    entries.map(
        entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("in-root");
            } else {
                entry.target.classList.remove("in-root");
            }
            return entry;
            });
    //get the first element with class in-root
    const toc=document.querySelector("#table-of-contents");
    const activeToc=toc.querySelector("a.on-display");
    const topHead=document.querySelector(".in-root");
    if (topHead!==null){
        const newToc=Array.from(toc.querySelectorAll("a")).find(
                     anchor=> anchor.hash === ("#"+topHead.getAttribute("id")));
        activeToc.classList.remove("on-display");
        newToc.classList.add("on-display");
    } else {//no head in-root, entries consists of elements that have left, at most one
        if(entries[0].boundingClientRect.top > 0){
           //the entry has bottomed out, newToc should become the next one up
           const headParent=entries[0].target.parentElement;
           //TODO: not quite right, if headParent.parentElement has children then
           //the first in-root of those should be selected or the last one,
            //ie headParent.parentElement.lastElementChild, if none
           //is in-root, which is the case here. Otherwise this jumps
           //too far. This should be recursive if headParent.parentElement.lastElementChild
           //has children as well. Perhaps query headParent.parentElement for
           //outline-container-org ids and pick the last of them as newToc.
           const prevHead=headParent.previousElementSibling!==null?headParent.previousElementSibling.firstElementChild
              :headParent.parentElement.firstElementChild;
           const newToc=Array.from(toc.querySelectorAll("a")).find(
                     anchor=> anchor.hash === ("#"+prevHead.getAttribute("id")));
           //note prevHead could be the table-of-contents headline, which has
           //id="", so newToc could be undefined. This occurs when the top heading
           //is obscured by the menu, no action needed in this case
           if(newToc!==undefined){
               activeToc.classList.remove("on-display");
               newToc.classList.add("on-display");
           }
        }
    }
}
// The Code:4 ends here
