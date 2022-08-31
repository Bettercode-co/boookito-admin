



export const COLUMNS = [
    {
      Header: "ID",
      accessor: "id",
      Footer: "ID",
    },
    {
      Header: "Price",
      accessor: "price",
      Footer: "Price"

    },
    {
      Header: "Title",
      accessor: "title", 
      Footer: "Title"

    },
    {
      Header: "Description",
      accessor: "description",
      Footer: "Description"

    },
    {
      Header: "Category",
      accessor: "category",
      Footer: "Category"

    },
  ]


export const CATEGORY_COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
    Footer: "ID"
  },
  
    {
      Header: "Price",
      accessor: "price",
      Footer: "Price"
    },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Title",
        accessor: "title", 
        Footer: "Title"
      },
      {
        Header: "Description",
        accessor: "description",
        Footer: "Description"
      },
      {
        Header: "Category",
        accessor: "category",
        Footer: "Category"
      },
    ]
  }
]


export const FA_COLUMNS = [

  {
    Header: "نام",
    accessor: "first_name",
  },
  {
    Header: "نام خانوادگی",
    accessor: "last_name", 
  },
  {
    Header: "شماره تماس",
    accessor: "phone_number",
  },
  {
    Header: "آدرس",
    accessor: "address.full_address",
  },
]
