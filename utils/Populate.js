const populateFunctionality = async (query) => {
  if (typeof query === "string") {
    query = [query];
  }

  const generatedPopulateQuery = [];

  if (query && query.length > 0) {
    function generateNestedPopulate(populatePath) {
      const [currentPopulatePath, ...remaininPopulatePath] =
        populatePath.split(".");

      const populateObject = {
        path: currentPopulatePath,
      };

      if (remaininPopulatePath.length > 0) {
        populateObject.populate = generateNestedPopulate(
          remaininPopulatePath.join(".")
        );
      }

      return populateObject;
    }

    query.forEach((option) => {
      const generatedNestedPopulate = generateNestedPopulate(option);
      generatedPopulateQuery.push(generatedNestedPopulate);
    });
  }

  return generatedPopulateQuery;
};

module.exports = { populateFunctionality };
