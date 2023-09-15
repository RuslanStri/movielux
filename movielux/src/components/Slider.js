export default function Slider( { items } ) {
    
  let isPressedDown = false;
  let cursorXSpace;

  let itemsToRender = items.map(item => {
      return(
        <div className="slider-card" key={item.id}>
          <img className="slider-img" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title || item.name} />
          <h3>{item.name || item.title}</h3>
        </div>)
    });
    

    window.addEventListener("mouseup", () => {
      isPressedDown = false;
    });

    function handleMouseUp(e) {
      e.target.style.cursor = "grab";
    }

    function handleMouseDown(e) {
      isPressedDown = true;
      cursorXSpace = e.nativeEvent.offsetX - e.target.lastChild.offsetLeft;
      e.target.style.cursor = "grabbing";
    }

    function handleMouseMove(e) {
      if (!isPressedDown) return;
      e.preventDefault();
      e.target.lastChild.style.left = `${e.nativeEvent.offsetX - cursorXSpace}px`;
      boundCards(e);
    }

    
    function handleTouchUp(e) {
      e.target.style.cursor = "grab";
    }

    function handleTouchDown(e) {
      isPressedDown = true;
      var rect = e.target.getBoundingClientRect();
      var x = e.targetTouches[0].pageX - rect.left;
      cursorXSpace = x - e.target.lastChild.offsetLeft;
      e.target.style.cursor = "grabbing";
    }

    function handleTouchMove(e) {
      if (!isPressedDown) return;
      var rect = e.target.getBoundingClientRect();
      var x = e.targetTouches[0].pageX - rect.left;
      e.target.lastChild.style.left = `${x - cursorXSpace}px`;
      boundCards(e);
    }

    function boundCards(e) {
      const container_rect = e.target.getBoundingClientRect();
      const cards_rect = e.target.lastChild.getBoundingClientRect();
    
      if (parseInt(e.target.lastChild.style.left) > 0) {
        e.target.lastChild.style.left = 0;
      } else if (cards_rect.right < container_rect.right) {
        e.target.lastChild.style.left = `-${cards_rect.width - container_rect.width}px`;
      }
    }

    return (
      <div className="slider-container" 
            onMouseUp={handleMouseUp} 
            onMouseDown={handleMouseDown} 
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchDown}
            onTouchEnd={handleTouchUp}
            onTouchMove={handleTouchMove}
      >
      <div className="slider-cards">
        {itemsToRender}
      </div>
    </div>
    )
  }