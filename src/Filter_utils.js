// Function will generate a whereClause for ALSQL query
// @Param: Input
// selectedItems: List (example: selectedItems: [1,2,3])
// filterLabel: string (example: filterLabel: "column")
// valueDateType: string (example: valueDateType: "range")
function generateALSQLWhereClause(
    selectedItems,
    filterLabel,
    valueDateType = "number"
  ) {
    let queryItem = "";
    for (var i in selectedItems) {
      console.log(selectedItems,"selectedItems");
      switch (valueDateType) {
        case "number":
          queryItem += " " + filterLabel + "=" + selectedItems[i] + " OR";
          break;
        case "rangeFilter":
          queryItem += "  (" + selectedItems[0] + "<="+ filterLabel+ "  AND " + filterLabel+"<=" + selectedItems[1] + ") OR";
          break;
        default:
          break;
      }
    }
    if (queryItem.length == 0) {
      queryItem = " " + filterLabel .length+ " >= 0  ";
    }
    var filter = queryItem.split(" ");
    filter.pop();
    return filter.join(" ");
  }
  export { generateALSQLWhereClause };
  