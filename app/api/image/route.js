export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const imageUrl = searchParams.get('url');

        if (!imageUrl) {
            return Response.json(
                { error: 'Image URL is required' },
                { status: 400 }
            );
        }

        // Decode the URL if it's encoded
        const decodedUrl = decodeURIComponent(imageUrl);

        // Validate that it's from dummyjson to prevent abuse
        if (!decodedUrl.includes('dummyjson.com') && !decodedUrl.includes('cdn.dummyjson.com')) {
            return Response.json(
                { error: 'Only dummyjson.com images are supported' },
                { status: 403 }
            );
        }

        const response = await fetch(decodedUrl);

        if (!response.ok) {
            return Response.json(
                { error: `Image fetch failed: ${response.status}` },
                { status: response.status }
            );
        }

        // Get the image content-type
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        const buffer = await response.arrayBuffer();

        return new Response(buffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400', // Cache for 1 day
            },
        });
    } catch (error) {
        console.error('Error proxying image:', error);
        return Response.json(
            { error: 'Failed to fetch image', details: error.message },
            { status: 500 }
        );
    }
}
