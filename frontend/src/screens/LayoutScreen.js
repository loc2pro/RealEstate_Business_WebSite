// import React from "react";
// import $ from "jquery";
// import jQuery from "jquery";

// function LayoutScreen() {
//   $(document).ready(function(){

//     $(".owl-carousel").owlCarousel({    
//       loop:true,
//       items:1,
//       margin:0,
//       stagePadding: 0,
//       autoplay:false  
//     });
    
//     const dotcount = 1;
    
//     jQuery('.owl-dot').each(function() {
//       jQuery( this ).addClass( 'dotnumber' + dotcount);
//       jQuery( this ).attr('data-info', dotcount);
//       dotcount=dotcount+1;
//     });
    
//     const slidecount = 1;
    
//     jQuery('.owl-item').not('.cloned').each(function() {
//       jQuery( this ).addClass( 'slidenumber' + slidecount);
//       slidecount=slidecount+1;
//     });
    
//     jQuery('.owl-dot').each(function() {  
//       grab = jQuery(this).data('info');   
//       slidegrab = jQuery('.slidenumber'+ grab +' img').attr('src');
//       jQuery(this).css("background-image", "url("+slidegrab+")");   
//     });
    
//     amount = $('.owl-dot').length;
//     gotowidth = 100/amount;     
//     jQuery('.owl-dot').css("height", gotowidth+"%");
  
//   });

//   return (
//     <div>
//      <h1>Owl Carousel 2 with Vertical Thumbnails</h1>
// <div class="content-carousel">
//   <div class="owl-carousel">
//     <div> <img src="https://dummyimage.com/600x400/ef3e3e/231f20.png&text=Carousel"/> </div>
//     <div> <img src="https://dummyimage.com/600x400/16c1f3/231f20.png&text=Carousel"/> </div>
//     <div> <img src="https://dummyimage.com/600x400/fff200/231f20.png&text=Carousel"/> </div>
//     <div> <img src="https://dummyimage.com/600x400/f48480/231f20.png&text=Carousel"/> </div>
//     <div><img src="https://dummyimage.com/600x400/8dd8f8/231f20.png&text=Carousel"/> </div>
//     <div><img src="https://dummyimage.com/600x400/fffac2/231f20.png&text=Carousel"/> </div>
//   </div>
// </div>
//     </div>
//   );
// }

// export default LayoutScreen;
