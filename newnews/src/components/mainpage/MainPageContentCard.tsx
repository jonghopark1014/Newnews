import "@styles/MainPageStyle.scss"
interface Iporps {

}

export function MainPageContentCard({}: Iporps){
    const bgImg = "newImg";
    const newsTitle = "title";

    return (
        <div className="main-page-content-card">
            <h3>{newsTitle}</h3>
        </div>
    )
}