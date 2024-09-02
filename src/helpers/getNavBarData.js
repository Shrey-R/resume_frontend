const getNavBarData = (setActiveTab) => [
    {
      id: 1,
      name: "Submit Details",
      value: "form",
      onClick: () => setActiveTab("form"),
    },
    {
      id: 2,
      name: "Get Details",
      value: "display",
      onClick: () => setActiveTab("display"),
    },
  ];
  
  export default getNavBarData;
  