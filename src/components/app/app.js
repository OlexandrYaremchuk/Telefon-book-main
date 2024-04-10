import { Component } from "react";
import AppFilter from "../app-filter/app-filter";
import AppInfo from "../app-info/app-info";
import EmployeesAddForm from "../employers-add-form/employers-add-form";
import EmployersList from "../employers-list/employers-list";
import SearchPanel from "../search-panel/search-panel";
import "./app.css";
import {Box} from '@mui/material';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(localStorage.getItem("data"))
        ? JSON.parse(localStorage.getItem("data"))
        : [
            {
              name: "Наталія М.",
              salary: 675831290,
              
              increase: false,
              rise: true,
              id: 1,
            },
            {
              name: "Людмила В.",
              salary: 985268791,
              increase: false,
              rise: false,
              id: 2,
            },
            {
              name: "Оксана Я.",
              salary: 938462189,
              increase: false,
              rise: false,
              id: 3,
            },
            {
              name: "Петро М.",
              salary: 938462189,
              increase: false,
              rise: false,
              id: 4,
            },
            {
              name: "Поліна К.",
              salary: 938462189,
              increase: false,
              rise: false,
              id: 5,
            },
            {
              name: "Юлія М.",
              salary: 938462792,
              increase: false,
              rise: false,
              id: 6,
            },
          ],
      term: "",
      filter: "all",
    };
    this.maxId = 7;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      data = data.filter((item) => item.id !== id);
      localStorage.setItem("data", JSON.stringify(data));
      return {
        data: data,
      };
    });
  };

  // Да, пока могут добавляться пустые пользователи. Мы это еще исправим
  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      localStorage.setItem("data", JSON.stringify(newArr));
      return {
        data: newArr,
      };
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        localStorage.setItem('data', JSON.stringify(data));
        return item;
      }),
    }));
    
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "rise":
        return items.filter((item) => item.rise);
      case "moreThen1000":
        return items.filter((item) => item.increase);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
      
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployersList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAdd={this.addItem} />
        <Box>
        
       
        </Box>
      </div>
    );
  }
}

export default App;
