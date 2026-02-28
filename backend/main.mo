import Text "mo:core/Text";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type Shoe = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    availableSizes : [Nat];
    image : Text;
  };

  module Shoe {
    let compare = Nat.compare;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    availableSizes : [Nat];
    image : Text;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      switch (Text.compare(product1.category, product2.category)) {
        case (#equal) { Text.compare(product1.name, product2.name) };
        case (order) { order };
      };
    };

    public func compareByPrice(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.price, product2.price);
    };
  };

  let products = Map.empty<Nat, Product>();

  public shared ({ caller }) func initialize() : async () {
    if (not products.isEmpty()) { Runtime.trap("Backend database already initialized") };

    let categorySneakers = "Sneakers";
    let categoryBoots = "Boots";
    let categorySandals = "Sandals";
    let categoryFormal = "Formal";

    let sampleProducts : [Product] = [
      {
        id = 1;
        name = "Classic Sneakers";
        description = "Comfortable everyday sneakers in various colors.";
        price = 5000;
        category = categorySneakers;
        availableSizes = [6, 7, 8, 9, 10, 11, 12];
        image = "/images/shoe/Classic-Sneakers.jpg";
      },
      {
        id = 2;
        name = "Leather Boots";
        description = "Durable leather boots for all weather conditions.";
        price = 12000;
        category = categoryBoots;
        availableSizes = [7, 8, 9, 10, 11];
        image = "/images/shoe/Leather-Boots.jpg";
      },
      {
        id = 3;
        name = "Running Shoes";
        description = "Lightweight and supportive running shoes.";
        price = 7500;
        category = categorySneakers;
        availableSizes = [6, 7, 8, 9, 10, 11];
        image = "/images/shoe/Running-Shoes.jpg";
      },
      {
        id = 4;
        name = "Fashion Sandals";
        description = "Stylish sandals perfect for summer.";
        price = 3500;
        category = categorySandals;
        availableSizes = [6, 7, 8, 9, 10];
        image = "/images/shoe/Fashion-Sandals.jpg";
      },
      {
        id = 5;
        name = "Formal Oxford Shoes";
        description = "Elegant oxford shoes for formal occasions.";
        price = 9500;
        category = categoryFormal;
        availableSizes = [7, 8, 9, 10, 11, 12];
        image = "/images/shoe/Formal-Oxford-Shoes.jpg";
      },
      {
        id = 6;
        name = "High-Top Sneakers";
        description = "Trendy high-top sneakers in various colors.";
        price = 6000;
        category = categorySneakers;
        availableSizes = [6, 7, 8, 9, 10];
        image = "/images/shoe/High-Top-Sneakers.jpg";
      },
      {
        id = 7;
        name = "Chelsea Boots";
        description = "Versatile chelsea boots for any occasion.";
        price = 10000;
        category = categoryBoots;
        availableSizes = [7, 8, 9, 10, 11];
        image = "/images/shoe/Chelsea-Boots.jpg";
      },
      {
        id = 8;
        name = "Flip Flops";
        description = "Comfortable flip flops for the beach.";
        price = 2000;
        category = categorySandals;
        availableSizes = [6, 7, 8, 9, 10];
        image = "/images/shoe/Flip-Flops.jpg";
      },
      {
        id = 9;
        name = "Dress Loafers";
        description = "Sophisticated loafers for formal wear.";
        price = 8500;
        category = categoryFormal;
        availableSizes = [7, 8, 9, 10, 11];
        image = "/images/shoe/Dress-Loafers.jpg";
      },
      {
        id = 10;
        name = "Trail Running Shoes";
        description = "Rugged shoes for trail running adventures.";
        price = 8000;
        category = categorySneakers;
        availableSizes = [7, 8, 9, 10, 11, 12];
        image = "/images/shoe/Trail-Running-Shoes.jpg";
      },
      {
        id = 11;
        name = "Winter Boots";
        description = "Insulated boots for cold weather.";
        price = 13000;
        category = categoryBoots;
        availableSizes = [8, 9, 10, 11, 12];
        image = "/images/shoe/Winter-Boots.jpg";
      },
      {
        id = 12;
        name = "Sport Sandals";
        description = "Durable sandals for outdoor activities.";
        price = 4000;
        category = categorySandals;
        availableSizes = [7, 8, 9, 10, 11];
        image = "/images/shoe/Sport-Sandals.jpg";
      },
    ];

    for (product in sampleProducts.values()) {
      products.add(product.id, product);
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    let valuesIter = products.values();
    valuesIter.toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let filteredIter = products.values().filter(
      func(product) { Text.equal(product.category, category) }
    );
    filteredIter.toArray().sort();
  };

  public query ({ caller }) func getProductsSortedByPrice() : async [Product] {
    let valuesIter = products.values();
    valuesIter.toArray().sort(Product.compareByPrice);
  };

  public query ({ caller }) func getProductById(productId : Nat) : async ?Product {
    products.get(productId);
  };
};
