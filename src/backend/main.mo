import Array "mo:core/Array";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type Checklist = {
    customerName : Text;
    vehicleModel : Text;
    date : Int;
    technicianName : Text;
    batteryStatus : Text;
    vehicleStatus : Text;
  };

  module Checklist {
    public func compareByDate(checklist1 : Checklist, checklist2 : Checklist) : Order.Order {
      Int.compare(checklist2.date, checklist1.date);
    };
  };

  let checklists = Map.empty<Int, Checklist>();
  var nextId = 0;

  public type ChecklistInput = {
    customerName : Text;
    vehicleModel : Text;
    technicianName : Text;
    batteryStatus : Text;
    vehicleStatus : Text;
  };

  public shared ({ caller }) func saveChecklist(input : ChecklistInput) : async Int {
    let id = nextId;
    let checklist : Checklist = {
      input with
      date = Time.now();
    };
    checklists.add(id, checklist);
    nextId += 1;
    id;
  };

  public query ({ caller }) func getChecklist(id : Int) : async Checklist {
    switch (checklists.get(id)) {
      case (null) { Runtime.trap("Checklist not found") };
      case (?checklist) { checklist };
    };
  };

  public query ({ caller }) func getRecentChecklists(limit : Nat) : async [Checklist] {
    // Take first `limit` elements of the sorted array, using .take on Iter instead of array
    checklists.values().toArray().sort(Checklist.compareByDate).values().take(limit).toArray();
  };
};
