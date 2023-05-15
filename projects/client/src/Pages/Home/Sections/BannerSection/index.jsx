import banner from "../../../../Assets/Banners/banner1.png"

const BannerSection = () => {
    return (
        <div className="flex justify-center px-5 py-2">
            <img src={banner} alt="banner" aria-hidden="true" />
        </div>
    )
}

export default BannerSection;