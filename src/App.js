import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
    constructor(){
      super();
      this.state = {
        Value : [],
        loading : true,
        currentPage : 1,
        PostPerPage: '1',
      }

    }

    

    renderDatasetsTable(Dataset) {
      return (
          <div className="SearchBack">
              <div className="DataBox" key={Dataset.id}>
                {/* {software_Name} */}
                <div className="DataTitle"> {Dataset.id}</div>
                {/* {software_Version} */}
                <div className="DataVersion" > ver:  {Dataset.id}</div>
                  {/* {website_Link} */}
      <div className="DataWeb" ><strong>Website Link</strong> : {Dataset.id}</div>
                {/* {nsD_Response_Time} */}
                <div className="DataWeb" > <strong>Date Modified </strong> : {Dataset.id}</div>

                  <a href={Dataset.nsD_Response_Link}>
                      <button className="ui fluid button" style={{ backgroundColor: "#212121", display: "inline", color: "white"}} >Show Download link</button>
                  </a>
              </div>
          </div>
      );
    }

  componentDidMount()
  {
    this.GetData();
  }

  handleShift(data) {
    if (data === "inc") {
        this.setState(prevState => {
            return { currentPage: prevState.currentPage + 1 }
        });
    }
    else {
        this.setState(prevState => {
            return { currentPage: prevState.currentPage - 1 }
        });
        
    }
}

  Paginating(number)
      {
        this.setState({currentPage: number});
      }
  
  render(){

    var {Value} = this.state; 

    const IndexofLastPost = (this.state.currentPage)*(this.state.PostPerPage);
        const IndexofFirstPost = IndexofLastPost - (this.state.PostPerPage)
        const currentPost = Value.slice(IndexofFirstPost, IndexofLastPost);

      const Pages= [];

      const end = Math.min(Math.ceil(Value.length),5);

      for(let i = 1 ; i <= end; i++)
      {
        Pages.push(i);
      }

      let Pagination = Pages.map( number => (
        <div className="Page-box" key={number}>
          <div  onClick = {() => this.Paginating(number)} ><i className ={this.state.currentPage === number ?"circle icon" :"circle outline icon"}></i></div>
        </div>
    ))

    let GetResponse = this.state.loading 
    ? <div className="Loader"><i aria-hidden="true" className=" big spinner loading icon"></i></div>
    : currentPost.map(Dataset => {
        return (
            <div key={Dataset.id} className="SearchBack">
                {this.renderDatasetsTable(Dataset)}
                </div>
        );
          });

          const RightArrow = this.state.currentPage < end ? < div className="RightArrow" style={this.state.display === "Enlarged" ? { display: "none" } : {}} onClick={() => this.handleShift("inc")}><i class="angle large right icon"></i></div > : < div className="RightArrow" style={this.state.display === "Enlarged" ? { display: "none" } : {}} >
          <i class="angle large right icon"></i></div >

  const LeftArrow = this.state.currentPage > 1 ? < div className="LeftArrow" style={this.state.display === "Enlarged" ? { display: "none" } : {}} onClick={() => this.handleShift("dec")}>
      <i class="angle large left icon"></i></div > : < div className="LeftArrow" style={this.state.display === "Enlarged" ? { display: "none" } : {}} >
          <i class="angle large left icon"></i></div >


 return (
    <div className="page">
      <div className="navBar">
        </div>
        <img src="https://github.com/THELAZYKING/SoftwareDownloadSystem/blob/master/NAV.png?raw=true" alt="logo" className="navBar-logo"></img>

        {LeftArrow}
         {GetResponse}
        {RightArrow}
         <div className="Pagination-block">
  {Pagination}
  </div>

  <div>
  <a href="https://localhost:3000/nsdHome">
                      <button className="ui fluid button" style={{ backgroundColor: "#212121", color: "white", marginTop: "40px", width: "90%", marginLeft: "5%" }} >Show All Requests</button>
                  </a>
                  </div>
    </div>

 );

  }

  async GetData(){
    
    var response = await fetch('https://jsonplaceholder.typicode.com/posts');
    var data = await response.json();

    var Datalist = data.filter((data) => {
        return data.userId === 1;
    });

    this.setState({
      Value : Datalist, loading : false
    })
  }
}

export default App;
