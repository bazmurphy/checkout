// For a Friend, Good Luck with the Interview 😎

// this is the Class (OOP)
class Checkout {
  // this is the Class Constructor (OOP)
  // (pricingRules) says the Class will receive one argument
  constructor(pricingRules) {
    // this sets the argument as an Object on the Class that can be referenced with the "this" keyword "this.pricingRules"
    this.pricingRules = pricingRules;
    // this will contain a list of the items that are scanned in, and can be referenced with the "this" keyword "this.basket"
    this.basket = [];
  }

  // this is a Getter on the Class (OOP)
  get ViewBasket() {
    // console.log("Your Basket:", this.basket);
    return this.basket;
  }

  // this is a Public Method on the Class (OOP)
  Scan(item) {
    // every time we use the Scan method, we pass it an item,
    // and we push it into the basket array (which is like adding something to your basket in the real world)
    this.basket.push(item);
  }

  // this is a Getter on the Class (OOP)
  get Total() {
    // initialise a total
    let total = 0;

    // create a Map object to store how many of each item we have
    const itemMap = {};

    // loop through the basket
    // if the key exists on itemMap +1
    // else initialise a new key with a value of 1
    this.basket.forEach((item) => {
      itemMap[item] ? (itemMap[item] += 1) : (itemMap[item] = 1);
    });

    // check the itemMap after the loop
    // console.log("itemMap:", itemMap);

    // loop through the itemMap we just made
    Object.keys(itemMap).forEach((item) => {
      // console.log("item:", item);

      // this is important to use later
      const numberOfItems = itemMap[item];
      // console.log("numberOfItems:", numberOfItems);

      // this is important to use later
      const unitPrice = this.pricingRules[item].unitPrice;
      // console.log("unitPrice:", unitPrice);

      // if there is a Special Price String then:
      if (this.pricingRules[item].specialPriceString) {
        // console.log(`Item ${item} HAS a Special Price String 👍`);

        // split the string "3 for 150" into an Array of 3 elements // "A" Example: [ '3', 'for', '150' ]
        const specialPriceStringArray =
          this.pricingRules[item].specialPriceString.split(" ");
        // console.log("specialPriceStringArray:", specialPriceStringArray);

        // get the Quantity needed for the Special Price // "A" Example: 3
        const specialPriceQuantity = Number(specialPriceStringArray[0]);
        // console.log("specialPriceQuantity:", specialPriceQuantity);

        // get the Total of the Special Price // "A" Example: 150
        const totalSpecialPrice = Number(specialPriceStringArray[2]);
        // console.log("totalSpecialPrice:", totalSpecialPrice);

        // calculate how many Special Price Deals we have
        const numberOfSpecialPriceDeals = Math.floor(
          numberOfItems / specialPriceQuantity
        );
        // console.log("numberOfSpecialPriceDeals:", numberOfSpecialPriceDeals);

        // multiply the number of Special Price Deals with the Total Special Price, and add them to the total,
        total += numberOfSpecialPriceDeals * totalSpecialPrice;

        // calculate how many remaining Normal Price (non Special Deal) items there are
        const remainingNormalPriceItems = numberOfItems % specialPriceQuantity;
        // console.log("remainingNormalPriceItems:", remainingNormalPriceItems);

        // multiply the number of Normal Price Items by Unit Price, and add them to the total
        total += remainingNormalPriceItems * unitPrice;
      } else {
        // if there IS NOT a Special Price String then:
        // console.log(`Item ${item} DOES NOT HAVE a Special Price String 👎`);
        // multiply the Number Of items by the Unit Price
        total += numberOfItems * unitPrice;
      }
    });

    return total;
  }
}

// export the Checkout Class as a Common JS Module
module.exports = Checkout;
