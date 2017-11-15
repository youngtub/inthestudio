const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat
} = require('graphql');

const SongType = new GraphQLObjectType({
  name: 'AlbumSong',
  description: '...',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: res => res.name
    },
    spotifyId: {
      type: GraphQLString,
      resolve: res => res.id
    },
    trackNumber: {
      type: GraphQLInt,
      resolve: res => res.track_number
    }
  })
});

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  description: 'fromSpotify',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: response => response.name
    },
    artist: {
      type: GraphQLString,
      resolve: response => response.artists[0].name
    },
    spotifyId: {
      type: GraphQLString,
      resolve: response => response.id
    },
    image: {
      type: GraphQLString,
      resolve: response => response.images[0].url
    },
    popularity: {
      type: GraphQLInt,
      resolve: response => response.popularity
    },
    releaseDate: {
      type: GraphQLString,
      resolve: response => response.release_date
    },
    tracks: {
      type: new GraphQLList(SongType),
      resolve: response => response.tracks.items
    }
  })
})

const config = {
  headers: {
    'Authorization' : 'Bearer BQBofaQDoBK42eONdCQUWpZWzTy1axgbb9jNW8epA1DEx2zPFmjuLafpZv6pRdzUJVRL7irgKqrtZNBXGGneqA'
  }
}

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'SpotifyAlbum',
    description: '...',
    fields: () => ({
      album: {
        type: AlbumType,
        args: {
          id: {type: GraphQLString}
        },
        resolve: (root, args) => {
          return axios.get(`https://api.spotify.com/v1/albums/${args.id}`, config)
          .then((res) => res.data)
          .catch((err) => console.log('ERROR', err))
        }
      }
    })
  })
});

/*

query {
  album(id: "187UNqZ7MX3neMYkkevmdm") {
    title
    artist
    spotifyId
    image
    popularity
    releaseDate
    tracks {
      title
      spotifyId
      trackNumber
    }
  }
}

*/
