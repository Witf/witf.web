import decode from 'jwt-decode';

export const getTokenExporationDate = token => {
	const decoded = decode(token);
	if (!decoded.exp) return null;

	const date = new Date(0);
	date.setUTCSeconds(decoded.exp);

	return date;
};

export const isTokenExpired = token => {
	const date = getTokenExporationDate(token);
	const offsetSeconds = 0;
	if (date === null) {
		return false;
	}

	return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
};