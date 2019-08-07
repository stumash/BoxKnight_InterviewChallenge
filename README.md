# BoxKnight_InterviewChallenge

## API

```
POST /getBestShippingRate

{
    postalCode        : string,
    address_line_one ?: string,
    address_line_two ?: string,
    city             ?: string,
    province         ?: string,
    country          ?: string,
}
```

## ARCH.

![provider](./docs/images/provider_interface.png)
