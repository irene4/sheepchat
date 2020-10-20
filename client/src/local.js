import { useEffect, useState } from 'react';

export default function Store(key, init) {
	const localKey = 'im-' + key;
	const [val, setVal] = useState(() => {
		const jsonVal = localStorage.getItem(localKey);
		if (jsonVal != null) return JSON.parse(jsonVal);
		if (typeof init === 'function') {
			return init();
		} else {
			return init;
		}
	});
	useEffect(() => {
		localStorage.setItem(localKey, JSON.stringify(val));
	}, [localKey, val]);

	return [val, setVal];
}
