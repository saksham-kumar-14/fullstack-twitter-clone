import HomeRightHeader from "./home_right_header";
import RightNews from "./right_news";

const RightRegsiteredHome = ({ dark_mode , set_dark_mode , user_info , set_user_info }) => {

    return(
        <div className="w-[30%] h-[100vh] overflow-y-scroll">
            <HomeRightHeader dark_mode={dark_mode} set_dark_mode={set_dark_mode} 
            user_info={user_info} set_user_info={set_user_info}/>
            
            <div className="flex justify-center my-2">
                <RightNews dark_mode={dark_mode}/>
            </div>
        </div>
    )
}

export default RightRegsiteredHome;