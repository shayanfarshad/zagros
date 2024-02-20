/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import {DWidth} from '../../utils/constants';
import api from '../../utils/api';

// Sample data for the list

// Type for individual item in the list
interface ListItem {
  id: number;
  title: string;
  description: string;
  overview: string;
  poster_path: string;
}

// Type for navigation props
interface Props {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

interface MovieResponse {
  results: Array<any>; // Adjust the type of results based on the actual structure of the response
  total_pages: number;
  // Add other properties if they exist in the response
}

const HomeScreen: React.FC<Props> = ({}) => {
  // Function to handle item press
  const handleItemPress = (_item: ListItem) => {
    // Navigate to detail screen with item details
    // navigation.navigate('DetailScreen', {item});
  };

  const [movies, setMovies] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const flatListRef = useRef<any>(null);

  const fetchMovies = async (page: number): Promise<MovieResponse> => {
    const response = await api.get(`popular?language=en-US&page=${page}`, {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWI4OWU4M2YyOTlhYTBkYjQ4MzUzOTRhYmFlZGUxYyIsInN1YiI6IjY1ZDM3ZmIxZTA0ZDhhMDE2Mzk4YjVlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zub2ANM80GOZl_ZXNGwia7hQzKTDa3g7elaVg9jisXA',
    });
    return response.data as MovieResponse;
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const newMovies: MovieResponse = await fetchMovies(page);
      setMovies(newMovies.results);
      setHasMore(page <= newMovies.total_pages);
      setLoading(false);
    };

    if (hasMore) {
      loadMovies();
    }
  }, [hasMore, page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const renderItem = ({item}: {item: ListItem}) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
      <View style={styles.itemImage}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
          resizeMode="cover"
          width={60}
          height={60}
        />
      </View>
      <View style={styles.itemDesc}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.overView}>
          {item.overview}
        </Text>
      </View>
      <View style={styles.itemArrow}>
        <Text>{'>'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Movies" />
      <FlatList
        ref={flatListRef}
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString() + Date.now().toString()}
        // ListFooterComponent={renderFooter}
      />
      <View style={styles.pagination}>
        <Button title="prev" disabled={page === 1} onPress={handlePrevPage} />
        <Text>{page}</Text>
        <Button
          title="next"
          disabled={!hasMore || loading}
          onPress={handleNextPage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    padding: 20,
    width: DWidth * 0.9,
    borderRadius: 15,
    marginVertical: 8,
    height: 120,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  overView: {
    fontSize: 15,
    overflow: 'hidden',
  },
  pagination: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  itemImage: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 15,
  },
  itemDesc: {
    width: '70%',
  },
  itemArrow: {
    height: '100%',
    justifyContent: 'center',
  },
});

export default HomeScreen;
