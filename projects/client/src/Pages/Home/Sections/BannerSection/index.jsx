import banner from "../../../../Assets/Banners/banner1.png"

const BannerSection = () => {
    return (
        <div className="flex justify-center px-5 py-3">
            <img src={banner} alt="banner" aria-hidden="true" />
        </div>
    )
}

export default BannerSection;