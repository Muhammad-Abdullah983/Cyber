export async function GET(request, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return Response.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return Response.json(
                { error: `Product not found: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error(`Error proxying product ${params.id}:`, error);
        return Response.json(
            { error: 'Failed to fetch product', details: error.message },
            { status: 500 }
        );
    }
}
