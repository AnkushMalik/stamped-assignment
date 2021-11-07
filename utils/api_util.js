import getConfig from 'next/config'
import * as fetchImport from 'isomorphic-unfetch'

const unfetch = fetchImport.default || fetchImport
const { publicRuntimeConfig } = getConfig()
const { API_URL } = publicRuntimeConfig

const buildHeaders = (headers = null) => {
	return {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		...headers,
	}
}

const jsonFetch = async (url, additonalOptions = {}, additionalHeaders = null) => {
	const options = {
		...additonalOptions,
		headers: buildHeaders(additionalHeaders),
	}

	try {
		const apiUrl = `${API_URL}${url}`

		const response = await unfetch(apiUrl, options)

		const jsonResponse = await response.json()
		
		return jsonResponse
	} catch (error) {
		return error
	}
}

class APIUTIL {
	static get = async (url, additonalOptions = null, additionalHeaders = null) => {
		try {
			const options = {
				method: 'GET',
				...additonalOptions,
			}

			const headers = additionalHeaders
				? {
						...additionalHeaders,
				  }
				: null

			return await jsonFetch(url, options, headers)
		} catch (error) {
			if (error.name === 'AbortEerror') {
				return
			}
			return error
		}
	}

	static put = async (url, data, additonalOptions = null, additionalHeaders = null) => {
		try {
			const options = {
				body: JSON.stringify(data),
				method: 'PUT',
				...additonalOptions,
			}

			const headers = additionalHeaders
				? {
						...additionalHeaders,
				  }
				: null

			return await jsonFetch(url, options, headers)
		} catch (error) {
			if (error.name === 'AbortError') {
				return
			}

			return error
		}
	}
}

export default APIUTIL