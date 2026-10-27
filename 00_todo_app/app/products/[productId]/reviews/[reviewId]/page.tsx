

const ProductReview = async({params, }: { params: Promise<{productId : string; reviewId : string}>;}) => {
        const {productId, reviewId} = await params;

        return(
            <h1>Reviews {reviewId} for product {productId}</h1>
        )
}

export default ProductReview;