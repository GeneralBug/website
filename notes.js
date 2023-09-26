console.log("Hello world!"); 
populate_list();
collapsable_content();

function collapsable_content()
{
  //function handling content collapsing, https://www.w3schools.com/howto/howto_js_collapsible.asp
  var coll = document.getElementsByClassName("collapsible");
  var i;
        
  for (i = 0; i < coll.length; i++) 
  {
    coll[i].addEventListener("click", function() 
    {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") 
      {
        content.style.display = "none";
      } 
      else 
      {
        content.style.display = "block";
      }
    });
  }
}
    
function populate_list()
{
  //function for populating the list from json, based on https://stackoverflow.com/questions/28256271/populate-ul-in-html-with-json-data

  $.getJSON('/Assets/notes.json', function (data) 
  {
    var ul = document.getElementById("notes_list");
    console.log(data);
    for( var i = 0; i < data.notes.length; i++ )
    { 
      var o = data.notes[i];
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(o.title));
      ul.appendChild(li);    
    }                   
  });
}

//sorts the list, based on https://www.w3schools.com/howto/howto_js_sort_list.asp
    function sortListDir() 
    {
        var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
        list = document.getElementById("notes_list");
        switching = true;
        // Set the sorting sort_type to name
        sort_type = "name";
        // Make a loop that will continue until no switching has been done
        
        while (switching) 
        {
            switching = false;
            b = list.getElementsByTagName("LI");
            for (i = 0; i < (b.length - 1); i++) 
            {
                shouldSwitch = false;
                /* Check if the next item should switch place with the current item, based on the sorting sort_type (name or date): */
                if (sort_type == "name") 
                {
                    if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) 
                    {
                        /* If next item is alphabetically lower than current item, mark as a switch and break the loop: */
                        shouldSwitch = true;
                        break;
                    }
                } 
                else if (sort_type == "date") 
                {
            if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
            /* If next item is alphabetically higher than current item,
            mark as a switch and break the loop: */
            shouldSwitch= true;
            break;
            }
        }
        }
        if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
        // Each time a switch is done, increase switchcount by 1:
        switchcount ++;
        } else {
        /* If no switching has been done AND the sort_type is "name",
        set the sort_type to "date" and run the while loop again. */
        if (switchcount == 0 && direction == "name") {
            sort_type = "date";
            switching = true;
        }
        }
    }
    }
    
    var coll = document.getElementsByClassName("sorting");
    var i;
            
    for (i = 0; i < coll.length; i++) 
    {
        coll[i].addEventListener("click", sortListDir());
    }