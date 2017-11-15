const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat
} = require('graphql');

const RGSongType = new GraphQLObjectType({
  name: 'Song',
  description: 'Rap Genius',
  fields: {
    title_with_featured: { type: GraphQLString },
    header_image_thumbnail_url: { type: GraphQLString },
    url: { type: GraphQLString },
    // album: { type: GraphQLString },
    primary_artist: { type: GraphQLString },
    writer_artists: { type: new GraphQLList(GraphQLString) },
    producer_artists: { type: new GraphQLList(GraphQLString) }
  }
});

const SPAudioFeatures = new GraphQLObjectType({
  name: 'QualitativeFeatures',
  description: '...',
  fields: {
    danceability: {
      type: GraphQLFloat,
      resolve: track => track.danceability
    },
    energy: {
      type: GraphQLFloat,
      resolve: track => track.energy
    },
    loudness: {
      type: GraphQLFloat,
      resolve: track => track.loudness
    },
    key: {
      type: GraphQLFloat,
      resolve: track => track.key
    },
    mode: {
      type: GraphQLFloat,
      resolve: track => track.mode
    },
    speechiness: {
      type: GraphQLFloat,
      resolve: track => track.speechiness
    },
    acousticness: {
      type: GraphQLFloat,
      resolve: track => track.acousticness
    },
    instrumentalness: {
      type: GraphQLFloat,
      resolve: track => track.instrumentalness
    },
    liveness: {
      type: GraphQLFloat,
      resolve: track => track.liveness
    },
    valence: {
      type: GraphQLFloat,
      resolve: track => track.valence
    },
    tempo: {
      type: GraphQLFloat,
      resolve: track => track.tempo
    },
    duration: {
      type: GraphQLFloat,
      resolve: track => track.duration_ms
    },
    timeSignature: {
      type: GraphQLFloat,
      resolve: track => track.time_signature
    }
  }
})

const SPSongType = new GraphQLObjectType({
  name: 'Song',
  description: 'Spotify',
  fields: {
    title: {
      type: GraphQLString,
      resolve: track => track.name
    },
    spotifyId: {
      type: GraphQLString,
      resolve: track => track.id
    },
    album: {
      type: GraphQLString,
      resolve: track => track.album.name
    },
    audioFeatures: {
      type: SPAudioFeatures,
      resolve: track => {
        var trackId = track.id;
        return axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, config)
        .then((track) => track.data)
      }
    }
  }
});

const SPAlbumType = new GraphQLObjectType({
  name: 'Album',
  description: 'Spotify',
  fields: {
    title: {
      type: GraphQLString,
      resolve: album => album.name
    },
    spotifyId: {
      type: GraphQLString,
      resolve: album => album.id
    }
  }
})

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: response => response.data.artists.items[0].name
      },
    spotifyId: {
      type: GraphQLString,
      resolve: response => response.data.artists.items[0].id
    },
    topTracks: {
      type: new GraphQLList(SPSongType),
      resolve: response => {
        var artistId = response.data.artists.items[0].id;
        return axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, config)
        .then((tt) => {
          return tt.data.tracks
        })
      }
    },
    albums: {
      type: new GraphQLList(SPAlbumType),
      resolve: response => {
        var artistId = response.data.artists.items[0].id;
        return axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?country=US`, config)
        .then((res) => {
          return res.data.items
        })
      }

     }
  })
});

const axiosConfigForRapGenius = {
  'Authorization' : 'Bearer CY7DUGhn8enS_FHK4LxT-fZPUt2QCCNvg346ZLH_86nbzYIoqmxO6o19MrAIpJiO'
}

const config = {
  headers: {
    'Authorization' : 'Bearer BQBofaQDoBK42eONdCQUWpZWzTy1axgbb9jNW8epA1DEx2zPFmjuLafpZv6pRdzUJVRL7irgKqrtZNBXGGneqA'
  }
}

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'SpotifyArtist',
    description: '...',
    fields: () => ({
      artist: {
        type: ArtistType,
        args: {
          name: {type: GraphQLString}
        },
        resolve: (root, args) => {
          return axios.get(`https://api.spotify.com/v1/search?q=${args.name}&type=artist`, config)
        }
      }
    })
  })
});

/*

query {
  artist(name: "Future") {
    name
    spotifyId
    topTracks {
      title
      spotifyId
      album
      audioFeatures {
        danceability
        energy
        key
        loudness
        mode
        speechiness
        acousticness
        instrumentalness
        liveness
        valence
        tempo
        duration
        timeSignature
      }
    }
    albums {
      title
      spotifyId
    }
  }
}

*/
