export const customStylesSelect = {
    option: (provided, state ) => ({
        ...provided,
        borderBottom: '1px dotted gray',
        backgroundColor: state.isSelected ? '#606060' : state.isFocused ? '#cccccc' : 'white',
        color: state.isSelected ? 'white' : 'black',
        fontSize: '14px',
        "&:active": {
            backgroundColor: 
              state.isSelected
                ? '#f5a5c0'
                : '#f5e7ec'
          },
      }),
      control : (style, state) =>({  ...style, 
        borderRadius: "7px", 
        padding:"1px", 
        backgroundColor:'#fff', 
        marginBottom: '20px',
        fontSize:'14px',
        border: state.isFocused ? "1px solid #606060" : "1px solid #cccccc",
        boxShadow: state.isFocused ? "0px 0px 6px #606060" : "none",
         "&:hover": {
         border: "1px solid #606060",
         //boxShadow: "0px 0px 6px #fda4af"
         },
})
}