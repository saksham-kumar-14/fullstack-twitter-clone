import RightNewsApi from "./right_news_api";

const RightNews = ({ dark_mode }) => {

    return(
        <div className={dark_mode?"bg-[#14171A] rounded-3xl mx-2":
            "bg-[rgb(240,240,240)] rounded-3xl py-3 mx-2"}>
            <div className="px-5 py-2">
                <span className="font-semibold text-[1.3rem]">What's happening</span>
            </div>
            {RightNewsApi.map((e)=>{
                return(
                    <div className={dark_mode?"flex flex-col px-4 py-2 cursor-pointer duration-300 hover:bg-[rgb(35,35,35)]":
                    "flex flex-col px-4 py-2 cursor-pointer duration-300 hover:bg-[rgb(230,230,230)]"}>
                        <div>
                            <span className={dark_mode?"text-[0.75rem] text-gray-300":
                            "text-[0.75rem] text-gray-700"}>{e.title}</span>
                            <span className={dark_mode?"text-[0.75rem] text-gray-300":
                            "text-[0.75rem] text-gray-700"}>{e.subtitle}</span>
                        </div>

                        <span className="font-semibold">{e.news}</span>

                        <span className="font-medium text-[0.85rem]">Trending with <a className="text-[#1DA1F2] hover:underline">{e.trending1}</a> , <a className="text-[#1DA1F2] hover:underline">{e.trending2}</a></span>
                    </div>
                )
            })}
        </div>
    )
}

export default RightNews;