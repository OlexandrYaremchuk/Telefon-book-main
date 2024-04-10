import './app-info.css'

const AppInfo = ({employees,increased}) =>{
    return(
        <div className="app-info">
            <h1>Телефонний записник</h1>
            <h2>Загальна кількість контактів: {employees}</h2>
            <h2>Улюблені номери: {increased}</h2>
        </div>
    )
}

export default AppInfo;