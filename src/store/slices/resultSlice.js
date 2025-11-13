// store/resultSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHistogramsAndPublications, fetchBatchDocuments } from '../../services/resultService';

// Асинхронное действие для загрузки данных
export const fetchResults = createAsyncThunk(
  'results/fetchResults',
  async (searchParams, { rejectWithValue }) => {
    try {
      // Шаг 1: Загружаем гистограммы и список documentIds
      const { histograms, ids } = await fetchHistogramsAndPublications(searchParams);

      // Шаг 2: Загружаем первые 10 документов
      const initialDocuments = await fetchBatchDocuments(ids, 0, 10);

      // Возвращаем все данные для сохранения в Redux
      return { histograms, ids, initialDocuments };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Асинхронное действие для загрузки дополнительных документов
export const fetchMoreDocuments = createAsyncThunk(
  'results/fetchMoreDocuments',
  async ({ ids, offset, limit }, { rejectWithValue }) => {
    try {
      const documents = await fetchBatchDocuments(ids, offset, limit);

      if (!Array.isArray(documents)) {
        throw new Error('Response is not an array'); // Если `documents` не массив, бросаем ошибку
      }

      return documents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const resultSlice = createSlice({
  name: 'results',
  initialState: {
    histograms: [],
    documentIds: [],
    documents: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearResults: (state) => {
      state.histograms = [];
      state.documentIds = [];
      state.documents = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка fetchResults
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.histograms = action.payload.histograms; // Сохраняем гистограммы
        state.documentIds = action.payload.ids; // Сохраняем список ID документов
        state.documents = action.payload.initialDocuments; // Сохраняем первые 10 документов
      })
      
      // Обработка fetchMoreDocuments
      .addCase(fetchMoreDocuments.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.documents = [...state.documents, ...action.payload]; // Добавляем документы, если payload — массив
        } else {
          console.error('Payload is not iterable:', action.payload); // Логируем ошибку, если payload не массив
        }
      })
      
      .addCase(fetchMoreDocuments.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearResults } = resultSlice.actions;

export default resultSlice.reducer;
