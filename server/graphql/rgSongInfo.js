const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat
} = require('graphql');

const SingleArtistType = new GraphQLObjectType({
  name: 'singleartist',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: data => data.name
    },
    rapGeniusId: {
      type: GraphQLInt,
      resolve: data => data.id
    }
  })
})

const CustomPerformancesType = new GraphQLObjectType({
  name: 'custom',
  description: '...',
  fields: () => ({
    label: {
      type: GraphQLString,
      resolve: data => data.label
    },
    artists: {
      type: new GraphQLList(SingleArtistType),
      resolve: res => res.artists
    }
  })
})

const ArtistDetailsType = new GraphQLObjectType({
  name: 'artistDetails',
  description: 'allCollaborators',
  fields: () => ({
    primaryArtist: {
      type: SingleArtistType,
      resolve: data => data.primary_artist
    },
    producerArtists: {
      type: new GraphQLList(SingleArtistType),
      resolve: data => data.producer_artists
    },
    featuredArtists: {
      type: new GraphQLList(SingleArtistType),
      resolve: data => data.featured_artists
    },
    otherArtists: {
      type: new GraphQLList(CustomPerformancesType),
      resolve: data => data.custom_performances
    }
  })
})

const RGSongType = new GraphQLObjectType({
  name: 'AlbumSong',
  description: '...',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: res => res.title
    },
    rapGeniusId: {
      type: GraphQLString,
      resolve: res => res.id
    },
    url: {
      type: GraphQLString,
      resolve: res => res.url
    },
    allCollaborators: {
      type: ArtistDetailsType,
      resolve: res => {
        var songId = res.id;
        return axios.get(`http://api.genius.com/songs/${songId}`, axiosConfigForRapGenius)
        .then((response) => response.data.response.song)
      }
    }
  })
});

const axiosConfigForRapGenius = {
  headers: {
    'Authorization' : 'Bearer CY7DUGhn8enS_FHK4LxT-fZPUt2QCCNvg346ZLH_86nbzYIoqmxO6o19MrAIpJiO'
  }
}

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RapGeniusSong',
    description: '...',
    fields: () => ({
      song: {
        type: RGSongType,
        args: {
          title: {type: GraphQLString}
        },
        resolve: (root, args) => {
          var songName = args.title.replace(/ /g, '+');
          return axios.get(`http://api.genius.com/search/songs?q=${songName}`, axiosConfigForRapGenius)
          .then((res) => {
            console.log('DATA', res.data.response.sections[0].hits[0].result)
            return res.data.response.sections[0].hits[0].result
          })
          .catch((err) => console.log('ERROR', err))
        }
      }
    })
  })
});

/*

query {
  song(title: "she notice") {
    title
    rapGeniusId
    url
    allCollaborators {
      primaryArtist {
        name
        rapGeniusId
      }
      producerArtists {
        name
        rapGeniusId
      }
      featuredArtists {
        name
        rapGeniusId
      }
      otherArtists {
        label
        artists {
          name
        	rapGeniusId
        }
      }
    }
  }
}

*/
