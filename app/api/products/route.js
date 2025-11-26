export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit') || '300';
        const skip = searchParams.get('skip') || '0';
        const category = searchParams.get('category');

        let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

        // If category is specified, fetch from category endpoint instead
        if (category) {
            url = `https://dummyjson.com/products/category/${category}?limit=${limit}`;
        }

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return Response.json(
                { error: `API error: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error('Error proxying to dummyjson:', error);
        return Response.json(
            { error: 'Failed to fetch products', details: error.message },
            { status: 500 }
        );
    }
}
