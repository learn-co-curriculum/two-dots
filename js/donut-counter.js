$(function(){ // When document is ready run the code below

  // create variables for guest count and donut count.
  var guestCount = 0,
      donutCount = 0,
      $guestNum = $('#guests span'),
      $donutNum = $('#donuts span'),
      $status = $('#status'),
      $guests = $('#guests'),
      $donuts = $('#donuts'),
      $check = $('#check');
      

  // add event listeners for clicking buttons to add and remove guests.
  $guests.find('button').eq(0).click(function(){
    // increment guest count when clicked.
    guestCount += 1;
    // update the text of the guest number when clicked.
    $guestNum.text(guestCount);
  });

  $guests.find('button').eq(1).click(function(){
    if (guestCount > 0) {
      guestCount -= 1;
      $guestNum.text(guestCount);
    }
  });

  // add event listeners for clicking buttons to add and remove donuts.
  $donuts.find('button').eq(0).click(function(){
    // increment donut count when clicked.
    donutCount += 1;
    // update the text of the donut number when clicked.
    $donutNum.text(donutCount);
  });

  $donuts.find('button').eq(1).click(function(){
    if (donutCount > 0) {
      donutCount -= 1;
      $donutNum.text(donutCount);
    }
  });

  // add event listner for clicks on the check button.
  $check.find('button').click(function(){
    // when clicked update the text to display of guests are hungry when there are not enough donuts per guest and happy when there are enough donuts.
    if (donutCount < guestCount) {
      $status.text('Guests are hungry!');
    } else {
      $status.text('Guests are happy.');
    }
  });
});